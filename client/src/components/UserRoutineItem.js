import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function UserRoutineItem({userRoutine, updateTargetUserRoutine, myWeeksRoutine, removeUserRoutine}) {
    const {routine} = userRoutine
    const [assignedUserRoutines, setAssignedUserRoutines] = useState([])
    const [day, setDay] = useState("")
    

    const exceriseArr = routine.workouts.split(",");
    const setsNRepsList = routine.sets_n_reps.split(",");
    const setsNRepsPairings = setsNRepsList.map((pair) => {
        return pair.split("x");
    })
    

    //FIND BETTER SOLUTION TO KEY in LIST OF LIs
    const excercises = exceriseArr.map((excercise,index) => {
        return <li key={Math.random()*1000}>{excercise}: {setsNRepsPairings[index][0]}x{setsNRepsPairings[index][1]}</li>
    })

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/scheduledworkouts/${userRoutine.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({day_of_week: day})
        })
        .then(r => r.json())
        .then(assignedRoutine => {
            updateTargetUserRoutine(assignedRoutine.id, assignedRoutine["day_of_week"])
        })
        // updateTargetUserRoutine(userRoutine.id, day)

    }    
    
    function handleDelete() {
        fetch(`/scheduledworkouts/${userRoutine.id}`, {
            method: "DELETE"
        })
        .then(removeUserRoutine(userRoutine.id))
    }
 
    

    return (
        // <div className="userRoutineContentCards">
            <div className="content">
            <h4>{routine.name}</h4>
                <div className="userRoutineExerciseHolders">
                    <ul>
                        {excercises}
                    </ul>
                </div>
            <h4>Times Completed to date: {userRoutine.times_completed}</h4>
            {routine.shared? <h4>True</h4>: <h4>Share Routine With Others?</h4>}

            {userRoutine["day_of_week"]? <h4>Already Assigned</h4> :

            <div>
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
            <button onClick={handleDelete}>Delete Routine</button>
            <NavLink to={`/editRoutines/${routine.id}`}><button>Edit Routine</button></NavLink>
            </div>
            }
            
            </div>
        // </div>
    )
}


export default UserRoutineItem