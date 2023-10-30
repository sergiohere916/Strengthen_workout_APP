import React from "react";

function RoutineItem({routine}) {

    const excerciseList = routine.workouts.split(",");
    const excercises = excerciseList.map((excercise) => {
        return <li key={Math.random()*1000}>{excercise}: 3 x 10</li>
    })
    //FIX THE DAMN KEYSSS ISSUE
    
    function handleClick() {
        // addToMyRoutines(routine)
        console.log("SEND THIS TO STATE!! TO MY ROUTINES")
        console.log(routine)
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