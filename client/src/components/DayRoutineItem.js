import React from "react";


function DayRoutineItem({dayRoutine, updateTargetUserRoutine}) {
    const {routine} = dayRoutine
    
    const excercisesList = routine.workouts.split(",");
    //TEMPORARY SOLUTION TO KEY ISSUE
    const excercises = excercisesList.map((excercise) => <li key={Math.random()*1000}>{excercise}</li>)

    function handleClick() {
        console.log(dayRoutine.id)
        fetch(`/scheduledworkouts/${dayRoutine.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({day_of_week: ""})
        })
        .then(r => r.json())
        .then(unassignedRoutine => {
            updateTargetUserRoutine(unassignedRoutine.id, unassignedRoutine["day_of_week"])
        })
    }

    return (
        <div className="dayRoutineItem">
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