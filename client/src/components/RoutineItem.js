import React, { useContext } from "react";
import { UserContext } from "./Context";

import glossy from "./glossy-red-push-pin-png.webp";

function RoutineItem({routine, addNewUserRoutine, workouts}) {

    const user = useContext(UserContext)
    const excerciseList = routine.workouts.split(",");
    const sets_n_reps = routine.sets_n_reps.split(",");
    
    const excercises = excerciseList.map((excercise, index) => {
        return <li key={Math.random()*1000}>{excercise}: {sets_n_reps[index]}</li>
    })
    //FIX THE DAMN KEYSSS ISSUE
    const targetBodyParts = excerciseList.map((exercise, index) => {
        const bodyPartName = (workouts.filter((workout) => workout.name === exercise))[0].bodyPart;
        return bodyPartName + ", ";
    })
    const targetBodyPartsNonRepeating = [...new Set(targetBodyParts)];
    //remove final comma
    targetBodyPartsNonRepeating[targetBodyPartsNonRepeating.length - 1] = targetBodyPartsNonRepeating[targetBodyPartsNonRepeating.length -1].replace(",", "");
    
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
            <div id="pinHolder">
            <div id="pin">
                <img src={glossy}/>
            </div>
            </div>
            <h3>{routine.name} - Breakdown:</h3>
            <h4>Target Muscles/Bodyparts: {targetBodyPartsNonRepeating}</h4>
            <ul>Excercises: {"(Sets, Repetitions)"}
                {excercises}
            </ul>
            <h4>Likes: {routine.likes}</h4>
            <button onClick={handleClick}>Add to my Profile</button>
        </div>
    )
}


export default RoutineItem