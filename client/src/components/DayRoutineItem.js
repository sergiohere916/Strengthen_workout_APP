import React from "react";


function DayRoutineItem({dayRoutine}) {
    const {routine} = dayRoutine
    
    const excercisesList = routine.workouts.split(",");
    const excercises = excercisesList.map((excercise) => <li>{excercise}</li>)



    return (
        <div>
            <h3>{routine.name}</h3>
            <h4>Workouts:</h4>
            <ul>
                {excercises}
            </ul>
            <hr/>
        </div>
    )
}


export default DayRoutineItem