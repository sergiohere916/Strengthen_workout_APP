import React, { useState } from "react";

function UserRoutineItem({userRoutine}) {
    const {routine} = userRoutine
    
    const [assignedUserRoutines, setAssignedUserRoutines] = useState([])



    const exceriseArr = routine.workouts.split(",");

    const excercises = exceriseArr.map(excercise => {
        return <li>{excercise}</li>
    })

    return (
        <div className="userRoutineContentContainer">
            <div className="content">
            <h4>{routine.name}</h4>
            <ul>
                Workouts:
                {excercises}
            </ul>
            <h4>Times Completed to date: {userRoutine.times_completed}</h4>
            {routine.shared? <h4>True</h4>: <h4>Share Routine With Others?</h4>}
            <button>Assign to Weekday</button>
            </div>
        </div>
    )
}


export default UserRoutineItem