import React, { useContext } from "react";
import { UserContext } from "./Context";

function RoutineItem({routine, addNewUserRoutine}) {

    const user = useContext(UserContext)
    const excerciseList = routine.workouts.split(",");
    const excercises = excerciseList.map((excercise) => {
        return <li key={Math.random()*1000}>{excercise}: 3 x 10</li>
    })
    //FIX THE DAMN KEYSSS ISSUE
    
    function handleClick() {
       
        const scheduledWorkout = {
            day_of_week: "",
            user_id: user.id,
            routine_id: routine.id
        }
        fetch("/scheduledworkouts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(scheduledWorkout)
        })
        .then(r => r.json())
        .then(createdScheduledWorkout => {
            addNewUserRoutine(createdScheduledWorkout);
        })

    }

    return (
        <div className="allRoutinesCards">
            <h3>{routine.name}: Breakdown</h3>
            <h4>Targeted Muscles/Bodyparts: Chest</h4>
            <ul>Excercises:
                {excercises}
            </ul>
            <h4>Likes: {routine.likes}</h4>
            <button onClick={handleClick}>Add to my Profile</button>
        </div>
    )
}


export default RoutineItem