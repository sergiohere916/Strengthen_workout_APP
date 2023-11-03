import React, { useState } from "react";
import NavBar from "./NavBar";
import WorkoutListItem from "./WorkoutListItem";
import RoutineCreating from "./RoutineCreating";


function WorkoutsList({workouts, user, addNewUserRoutine}) {
    const [currentWorkouts, setCurrentWorkouts] = useState([])


    function onClickAddToRoutine(addedWorkout) {
        setCurrentWorkouts([...currentWorkouts, addedWorkout])
    }

    function onClickClearCurrentRoutine() {
        setCurrentWorkouts([])
    }

    
    const allWorkOuts = workouts.map((workout) => {
        return <WorkoutListItem key={workout.id} workout={workout} onClickAddToRoutine={onClickAddToRoutine}/>
    })


    return (
        <div>
            <NavBar/>
            <h1 id="title">Exercises:</h1>
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