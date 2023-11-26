import React, { useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function UserRoutineItem({userRoutine, updateTargetUserRoutine, myWeeksRoutine, removeUserRoutine}) {
    const {routine} = userRoutine
    const [assignedUserRoutines, setAssignedUserRoutines] = useState([])
    const [day, setDay] = useState("")
    console.log("These are assigned");
    
    const exceriseArr = routine.workouts.split(",");
    const setsNRepsList = routine.sets_n_reps.split(",");
    const setsNRepsPairings = setsNRepsList.map((pair) => {
        return pair.split("x");
    })
    
    const assignedDays = myWeeksRoutine.map((routine) => {
        return routine["day_of_week"];
    })
    console.log(assignedDays);
    //FIND BETTER SOLUTION TO KEY in LIST OF LIs
    const excercises = exceriseArr.map((excercise,index) => {
        return <li key={Math.random()*1000}>{capitalize(excercise)}: {setsNRepsPairings[index][0]}x{setsNRepsPairings[index][1]}</li>
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
            updateTargetUserRoutine(assignedRoutine.id, assignedRoutine["day_of_week"], "day_of_week")
        })
        // updateTargetUserRoutine(userRoutine.id, day)

    }    
    
    function handleDelete() {
        fetch(`/scheduledworkouts/${userRoutine.id}`, {
            method: "DELETE"
        })
        .then(removeUserRoutine(userRoutine.id))
    }
    
    function capitalize(phrase) {
        const firstLetterCap = phrase.slice(0,1).toUpperCase();
        const remainingPhrase = phrase.slice(1, phrase.length);
        return firstLetterCap + remainingPhrase;
    }
    

    return (
        // <div className="userRoutineContentCards">
            <div className="content">
            <h4>{routine.name}</h4>
                <div className="userRoutineExerciseHolders">
                <h4 className="userRoutineExerciseHolderDetails">{"Exercises (Sets x Reps) :"}</h4>
                    <ul className="holdersExercises">
                        {excercises}
                    </ul>
                </div>
            <h4>Times Completed to date: {userRoutine.times_completed}</h4>
            {/* {routine.shared? <h4>True</h4>: <h4>Share Routine With Others?</h4>} */}

            {userRoutine["day_of_week"]? <h4>Already Assigned</h4> :

            <div>
            <form onSubmit={handleSubmit}>
            <select name="days" select={day} onChange={(e) => setDay(e.target.value)} >
                
                <option value=""></option>
                {!assignedDays.includes("Monday")? (<option value="Monday">Monday</option>) : <></>}
                {!assignedDays.includes("Tuesday")? (<option value="Tuesday">Tuesday</option>) : <></>}
                {!assignedDays.includes("Wednesday")? (<option value="Wednesday">Wednesday</option>): <></>}
                {!assignedDays.includes("Thursday")? (<option value="Thursday">Thursday</option>) : <></>}
                {!assignedDays.includes("Friday")? (<option value="Friday">Friday</option>) : <></>}
                {!assignedDays.includes("Saturday")? (<option value="Saturday">Saturday</option>) : <></>}
                {!assignedDays.includes("Sunday")? (<option value="Sunday">Sunday</option>) : <></>}

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