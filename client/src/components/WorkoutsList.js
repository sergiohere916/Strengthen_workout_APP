import React, { useState } from "react";
import NavBar from "./NavBar";
import WorkoutListItem from "./WorkoutListItem";
import RoutineCreating from "./RoutineCreating";
import { Input, Space } from 'antd';



function WorkoutsList({workouts, user, addNewUserRoutine}) {
    const { Search } = Input;

    
    const [currentWorkouts, setCurrentWorkouts] = useState([])
    const [slices, setSlices] = useState([0,6])
    const [searchValue, setSearchValue] = useState("")

    function onClickAddToRoutine(addedWorkout) {
        setCurrentWorkouts([...currentWorkouts, addedWorkout])
    }

    function onClickClearCurrentRoutine() {
        setCurrentWorkouts([])
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
        return <WorkoutListItem key={workout.id} workout={workout} onClickAddToRoutine={onClickAddToRoutine}/>
    })


    return (
        <div>
            <NavBar/>
            <div id="exercisePageImageContainer">
            
            </div>
            <h1 id="title">Exercises:</h1>
            <div style={{display: "flex", textAlign: "center", justifyContent: "center", width: "100%"}}>
            <Search style={{width: 500}}placeholder="input search text" onChange={handleChange}  enterButton />
            </div>
            <div>
                <button onClick={showLessExercises}>Less</button>
                <button onClick={showMoreExercises}>More</button>
            </div>
            <div id="mainWorkoutPage">
                <div className="workoutsContainer">
                    {allWorkOuts}
                </div>
                <div className="routineCreaterContainer">
                    <RoutineCreating currentWorkouts={currentWorkouts} onClickClearCurrentRoutine={onClickClearCurrentRoutine} addNewUserRoutine={addNewUserRoutine} user={user}/>
                </div>
            </div>
        </div>
    )
}


export default WorkoutsList