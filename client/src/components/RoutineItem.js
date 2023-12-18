import React, { useContext } from "react";
import { UserContext } from "./Context";

import glossy from "./glossy-red-push-pin-png.webp";

function RoutineItem({routine, addNewUserRoutine, workouts}) {

    const user = useContext(UserContext)
    const excerciseList = routine.workouts.split(",");
    const sets_n_reps = routine.sets_n_reps.split(",");
    
    const excercises = excerciseList.map((excercise, index) => {
        return <li key={excercise + index}>{capitalize(excercise)}: {sets_n_reps[index]}</li>
    })
    
    const targetBodyParts = excerciseList.map((exercise, index) => {
        const bodyPartName = (workouts.filter((workout) => workout.name === exercise))[0].bodyPart;
        return bodyPartName + ", ";
    })
    const targetBodyPartsNonRepeating = [...new Set(targetBodyParts)];
    //remove final comma
    targetBodyPartsNonRepeating[targetBodyPartsNonRepeating.length - 1] = targetBodyPartsNonRepeating[targetBodyPartsNonRepeating.length -1].replace(",", "");
    
    function handleClick() {
       
        const copy = {
            name: routine.name,
            workouts: routine.workouts,
            sets_n_reps: routine.sets_n_reps,
            likes: 0,
            shared: false
        }
        //COPY AND CREATE ROUTINE THAT WILL BE ATTACHED TO USER's PROFILE
        fetch("/routines", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(copy)
        })
        .then(r => r.json())
        .then(copiedRoutine => {
            fetch("/scheduledworkouts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    day_of_week: "",
                    user_id: user.id,
                    routine_id: copiedRoutine.id
                })
            })
            .then(r => r.json())
            .then(createdScheduledWorkout => {
                addNewUserRoutine(createdScheduledWorkout);
                alert("Routine successfully saved to your profile")
            })
        }) 

    }

    
    function capitalize(phrase) {
        const firstLetterCap = phrase.slice(0,1).toUpperCase();
        const remainingPhrase = phrase.slice(1, phrase.length);
        return firstLetterCap + remainingPhrase;
    }

    //FUNCTION TO HAVE buttons to show more or less exercises instead of scrollbar
    // function showMore() {
        
    // }   

    return (
        <div className="allRoutinesCards">
            <div id="pinHolder">
            <div id="pin">
                <img src={glossy}/>
            </div>
            </div>
            <h3>{routine.name} - Breakdown:</h3>
            <h4>Target Muscles/ Routine Type: {targetBodyPartsNonRepeating}</h4>
            <ul className = "routineCardExercises">Excercises: {"(Sets, Repetitions)"}
                {excercises}
            </ul>
            <h4>Likes: {routine.likes}</h4>
            <button className ="routineCardButton" style={{backgroundColor: "rgba(248, 48, 48, 0.785)", color: "white"}}onClick={handleClick}>Add to my Profile</button>
            {/* {excerciseList.length > 4? (<button onClick={showMore}>{">>"}</button>): (<></>)} */}
        </div>
    )
}


export default RoutineItem