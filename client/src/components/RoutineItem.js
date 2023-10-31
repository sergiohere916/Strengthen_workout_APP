import React from "react";

function RoutineItem({routine, user}) {
    

    const excerciseList = routine.workouts.split(",");
    const excercises = excerciseList.map((excercise) => {
        return <li key={Math.random()*1000}>{excercise}: 3 x 10</li>
    })
    //FIX THE DAMN KEYSSS ISSUE
    
    function handleClick() {
        // addToMyRoutines(routine)
        //NEED TO USE THIS TO CREATE SCHEDULED WORKOUT AND SEND TO STATE!
        // console.log("SEND THIS TO STATE!! TO MY ROUTINES")
        // console.log(user.id)
        // console.log(routine)
        const scheduledWorkout = {
            day_of_week: "",
            user_id: user.id,
            routine_id: routine.id
        }
        // fetch("/scheduledworkouts", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(scheduledWorkout)
        // })
        // .then(r => r.json())
        // .then(createdScheduledWorkout => {
        //     console.log(createdScheduledWorkout);
        //     console.log("CREATES IT BUT NEED TO ADD TO STATE")
        // })
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