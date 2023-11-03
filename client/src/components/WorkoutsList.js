import React, { useState } from "react";
import NavBar from "./NavBar";
import WorkoutListItem from "./WorkoutListItem";
import RoutineCreating from "./RoutineCreating";


function WorkoutsList({workouts, user, addNewUserRoutine}) {
    const [currentWorkouts, setCurrentWorkouts] = useState([])
    const [slices, setSlices] = useState([0,6])

    function onClickAddToRoutine(addedWorkout) {
        setCurrentWorkouts([...currentWorkouts, addedWorkout])
    }

    function onClickClearCurrentRoutine() {
        setCurrentWorkouts([])
    }

    function showMoreExercises() {
        if (slices[1] + 6 <= workouts.length) {
            setSlices([slices[0] + 6, slices[1] + 6])
        }
    }

    function showLessExercises() {
        if (slices[1] - 6 >= 1) {
            setSlices([slices[0] - 6, slices[1] - 6])
        }
    }

    const filteredWorkouts = workouts.slice(slices[0], slices[1]);
    const allWorkOuts = filteredWorkouts.map((workout) => {
        return <WorkoutListItem key={workout.id} workout={workout} onClickAddToRoutine={onClickAddToRoutine}/>
    })


    return (
        <div>
            <NavBar/>
            <h1 id="title">Exercises:</h1>
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