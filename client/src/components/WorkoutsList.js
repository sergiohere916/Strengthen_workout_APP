import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import WorkoutListItem from "./WorkoutListItem";
import RoutineCreating from "./RoutineCreating";
import { Input, Layout, Space, Typography } from 'antd';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



function WorkoutsList({workouts, user, addNewUserRoutine}) {
    const { Search } = Input;

    const history = useHistory()

    useEffect(() => {
        fetch("/check_session")
        .then((r) => {
            if (!r.ok) {
                history.push("/");
            } 
        } )
    }, [])

    
    const [currentWorkouts, setCurrentWorkouts] = useState([])
    const [slices, setSlices] = useState([0,6])
    const [searchValue, setSearchValue] = useState("")
    const [currentSetsNReps, setCurrentSetsNReps] = useState([])

    function onClickAddToRoutine(addedWorkout) {
        setCurrentWorkouts([...currentWorkouts, addedWorkout])
    }

    function onClickAddDefaultSetsNReps() {
        setCurrentSetsNReps([...currentSetsNReps, [1,1]])
    }

    function onChangeUpdateSetsNReps(newValue, index, valuePosition) {
        currentSetsNReps[index][valuePosition] = newValue;
        console.log(currentSetsNReps[index][valuePosition]);
        setCurrentSetsNReps([...currentSetsNReps]) 
    }

    function onClickClearCurrentRoutine() {
        setCurrentWorkouts([])
        setCurrentSetsNReps([])
    }

    function removeExerciseFromRoutine(targetIndex) {
        const updatedRoutineExercises = currentWorkouts.filter((exercise, index) => index !== targetIndex );
        const updatedRoutineSets = currentSetsNReps.filter((setNRep, index) => index !== targetIndex );
        const exercises = updatedRoutineExercises.join(",");
        const setsNRepsUpdated = updatedRoutineSets.join(",");
        setCurrentWorkouts([...updatedRoutineExercises]);
        setCurrentSetsNReps([...updatedRoutineSets]);  
    }

    function showMoreExercises() {
        if (slices[1] + 6 <= searchValueFilteredWorkouts.length) {
            setSlices([slices[0] + 6, slices[1] + 6])
        } 
    }

    function showLessExercises() {
        if (slices[1] - 6 >= 1) {
            setSlices([slices[0] - 6, slices[1] - 6])
        } 
    }

    function handleChange(e) {
        console.log(e.target.value);
        setSlices([0,6]);
        setSearchValue(e.target.value);
    }

    const searchValueFilteredWorkouts = workouts.filter((workout) => {
        const value = searchValue.toLocaleLowerCase()
        return (workout.name.includes(value) || workout.target.includes(value) || workout.bodyPart.includes(value) || workout.equipment.includes(value))
    })

    const filteredWorkouts = searchValueFilteredWorkouts.slice(slices[0], slices[1]);
    const allWorkOuts = filteredWorkouts.map((workout) => {
        return <WorkoutListItem key={workout.id} workout={workout} onClickAddToRoutine={onClickAddToRoutine} onClickAddDefaultSetsNReps={onClickAddDefaultSetsNReps}/>
    })


    return (
        <div>
            <NavBar/>
            <Layout>
                <div id="exercisePageImageContainer"></div>
                <div className="reusableHomeAppTitleContainer">
                    <div className="homeAppTitles">
                        <h1 className="homeTitle1">SET YOUR WORKOUTS</h1>
                        <h3>Strive for consistency</h3>
                   </div>
                   <div className="homeAppTitles">
                        <h1 className="homeTitle2">STRENGTHEN</h1>
                        <h3>The only easy day was yesterday</h3>
                   </div>
                   <div className="homeAppTitles">
                        <h1 className="homeTitle3">SET YOUR GOALS</h1>
                        <h3>Seek to accomplish them</h3>
                   </div>
                </div>
            </Layout>
                {/* <h1 id="title">Exercises:</h1> */}
                <Typography id="title">Find the Best Exercises : </Typography>
                <Typography className = "pageDescriptions">Search through an assortment of exercises to find the ones that best fit your needs</Typography>
                <Typography className = "pageDescriptions">Save your favorite exercises by creating a routine and saving it to your profile. Create as many as you like.</Typography>
                <Typography className = "pageDescriptions">You can search exercises by name, targeted muscles, or filter them by the equipment needed.</Typography>
            <div style={{display: "flex", textAlign: "center", justifyContent: "center", width: "100%"}}>
                <Search style={{width: 500, marginTop: "50px"}}placeholder="Search" onChange={handleChange}  enterButton />
            </div>
            {/* <div>
                <button onClick={showLessExercises}>Less</button>
                <button onClick={showMoreExercises}>More</button>
            </div> */}
            <div id="mainWorkoutPage">
                <div className="workoutsContainer">
                    {allWorkOuts}
                <div id="moreButtons">
                    <button id="button1" onClick={showLessExercises}>{"<<"} Less</button>
                    <button id="button2" onClick={showMoreExercises}>More {">>"}</button>
                </div>
                </div>
                <div className="routineCreaterContainer">
                    <RoutineCreating currentWorkouts={currentWorkouts} currentSetsNReps={currentSetsNReps} 
                    onChangeUpdateSetsNReps={onChangeUpdateSetsNReps} onClickClearCurrentRoutine={onClickClearCurrentRoutine} 
                    addNewUserRoutine={addNewUserRoutine} user={user} removeExerciseFromRoutine={removeExerciseFromRoutine}/>
                </div>
                
            </div>
        </div>
    )
}


export default WorkoutsList