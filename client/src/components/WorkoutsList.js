import React, { useState } from "react";
import NavBar from "./NavBar";
import WorkoutListItem from "./WorkoutListItem";
import RoutineCreating from "./RoutineCreating";


function WorkoutsList({workouts}) {
    const [currentWorkouts, setCurrentWorkouts] = useState([])


    function onClickAddToRoutine(addedWorkout) {
        setCurrentWorkouts([...currentWorkouts, addedWorkout])
    }

    function onClickClearCurrentRoutine() {
        setCurrentWorkouts([])
    }

    console.log(currentWorkouts)
    const allWorkOuts = workouts.map((workout) => {
        return <WorkoutListItem key={workout.id} workout={workout} onClickAddToRoutine={onClickAddToRoutine}/>
    })


    return (
        <div>
            <NavBar/>
            <h1 id="title">Excercises:</h1>
            <div id="mainWorkoutPage">
                <div className="workoutsContainer">
                    {allWorkOuts}
                </div>
                <div className="routineCreaterContainer">
                    <RoutineCreating currentWorkouts={currentWorkouts} onClickClearCurrentRoutine={onClickClearCurrentRoutine}/>
                </div>
            </div>
        </div>
    )
}


export default WorkoutsList