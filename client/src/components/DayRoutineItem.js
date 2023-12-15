import React from "react";


function DayRoutineItem({dayRoutine, updateTargetUserRoutine, handleClickedRoutine, inHome}) {
    const {routine} = dayRoutine
    
    const excercisesList = routine.workouts.split(",");
    
    const excercises = excercisesList.map((excercise, index) => <li key={excercise + index}>{capitalize(excercise)}</li>)

    function handleClick() {
        fetch(`/scheduledworkouts/${dayRoutine.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({day_of_week: ""})
        })
        .then(r => r.json())
        .then(unassignedRoutine => {
            updateTargetUserRoutine(unassignedRoutine.id, unassignedRoutine["day_of_week"], "day_of_week");
        })
    }

    function capitalize(phrase) {
        const firstLetterCap = phrase.slice(0,1).toUpperCase();
        const remainingPhrase = phrase.slice(1, phrase.length);
        return firstLetterCap + remainingPhrase;
    }

    function checkInHome() {
        if (inHome === 1) {
            handleClickedRoutine(dayRoutine);
        }
    }

    return (
        <div className="dayRoutineItem" onClick={checkInHome}>
            <div className="dayRoutineUnassigner">
                <button onClick={handleClick}>X</button>
            </div>
            <h3>{routine.name}</h3>
            <h4 style={{color: "rgb(160, 32, 32)", fontWeight: "bold"}}>Workouts:</h4>
            <div className="dailyExercisesContainer">
                <ul>
                    {excercises}
                </ul>
            </div>
        </div>
    )
}


export default DayRoutineItem