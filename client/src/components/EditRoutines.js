import React, { useState } from "react";
import NavBar from "./NavBar";
import WorkoutListItem from "./WorkoutListItem";
import RoutineCreating from "./RoutineCreating";
import { Input, Layout, Space } from 'antd';
import EditRoutineForm from "./EditRoutineForm";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



function EditRoutines({workouts, user, addNewUserRoutine}) {
    const { Search } = Input;
    const {id} = useParams();

    
    const [currentWorkouts, setCurrentWorkouts] = useState([])
    const [slices, setSlices] = useState([0,6])
    const [searchValue, setSearchValue] = useState("")
    const [currentSetsNReps, setCurrentSetsNReps] = useState([])
    
    function onClickAddToRoutine(addedWorkout) { 
        setCurrentWorkouts([...currentWorkouts, addedWorkout])
    }

    function addAllExercises(exerciseList) {
        setCurrentWorkouts([...exerciseList]);
    }
    
    function onClickAddDefaultSetsNReps() {
        setCurrentSetsNReps([...currentSetsNReps, [1,1]])
    }

    function addSetsNReps(addedSets) {
        const pairs = addedSets.map((sets) => {
            return sets.split("x");
        });
        setCurrentSetsNReps([...pairs]); 
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
        // const newRoutine = {...routine, workouts: exercises, sets_n_reps: setsNRepsUpdated};
        // setRoutine(newRoutine);
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
                <div id="heroImage"></div>
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
            <h1 id="exercisesSearchTitle">Exercises:</h1>
            <div style={{display: "flex", textAlign: "center", justifyContent: "center", width: "100%"}}>
            <Search style={{width: 500}}placeholder="input search text" onChange={handleChange}  enterButton />
            </div>
            <div>
                <button onClick={showLessExercises}>Less</button>
                <button onClick={showMoreExercises}>More</button>
            </div>
            <div id="exercisesPage">
                <div className="workoutsContainer">
                    {allWorkOuts}
                </div>
                <div style={{width: "20%"}} >
                    {/* className="routineCreaterContainer" */}
                    {/* ClassName above is for this div and will match workoutlist create routine design...experimenting*/}
                    {/* <RoutineCreating currentWorkouts={currentWorkouts} currentSetsNReps={currentSetsNReps} onChangeUpdateSetsNReps={onChangeUpdateSetsNReps} onClickClearCurrentRoutine={onClickClearCurrentRoutine} addNewUserRoutine={addNewUserRoutine} user={user}/> */}
                    <EditRoutineForm userId={user.id} routineId={id} addedWorkouts={currentWorkouts} 
                    addedSetsNReps={currentSetsNReps} onChangeUpdateSetsNReps={onChangeUpdateSetsNReps}
                     addToRoutine={addAllExercises} addSetsNReps={addSetsNReps} removeExerciseFromRoutine={removeExerciseFromRoutine}/>
                </div>
            </div>
        </div>
    )
}


export default EditRoutines