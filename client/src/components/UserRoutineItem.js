import React, { useState } from "react";

function UserRoutineItem({userRoutine, updateTargetUserRoutine, myWeeksRoutine}) {
    const {routine} = userRoutine
    const [assignedUserRoutines, setAssignedUserRoutines] = useState([])
    const [day, setDay] = useState("")
    

    const exceriseArr = routine.workouts.split(",");

    //FIND BETTER SOLUTION TO KEY in LIST OF LIs
    const excercises = exceriseArr.map(excercise => {
        return <li key={Math.random()*1000}>{excercise}</li>
    })

    function handleSubmit(e) {
        e.preventDefault()
        updateTargetUserRoutine(userRoutine.id, day)

    }    
    
 
    

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

            {userRoutine["day_of_week"]? <h4>Already Assigned</h4> :

            <form onSubmit={handleSubmit}>
            <select name="days" select={day} onChange={(e) => setDay(e.target.value)} >
                
                <option value=""></option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>

            </select>
            <button type="submit">Assign to Weekday</button>
            </form>

            }

            </div>
        </div>
    )
}


export default UserRoutineItem