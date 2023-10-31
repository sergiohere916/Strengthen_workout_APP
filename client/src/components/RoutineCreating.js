import React, { useState } from "react";

function RoutineCreating({currentWorkouts, onClickClearCurrentRoutine, addNewUserRoutine, user}) {
    const [routineName, setRoutineName] = useState("")
    // const [sharedStatus, setSharedStatus] = useState(null)


    const displayWorkoutNames = currentWorkouts.map((workout) => {return <li>{workout}</li>})
    

    function handleClick() {
        onClickClearCurrentRoutine()
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        if (currentWorkouts.length >= 1) {
            const newRoutine = {
                name: routineName,
                workouts: currentWorkouts.join(","),
                likes: 0,
                shared: 0
            }
            fetch("/routines", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(newRoutine)
            })
            .then(r => r.json())
            .then(data => {
                console.log("new routine");
                console.log(data);
                fetch("/scheduledworkouts", {
                    method: "POST",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify({
                        day_of_week: "",
                        user_id: user.id,
                        routine_id: data["id"]
                    })
                })
                .then(r => r.json())
                .then(data => {
                    addNewUserRoutine(data);
                    onClickClearCurrentRoutine();
                    setRoutineName("");
                })
            })
            //ADD THE NEW ROUTINE INTO STATE SO IT CAN BE SENT TO ROUTINES PAGE will need function
            //ADD scheduledworkot into state as well and send up with function same as routine
        } else {
            console.log("SOME LOGIC TO DISPLAY ERROR")
        }
    }

    return (
        <div>
            <div>
            <button onClick={handleClick}>CLEAR ALL</button>
            
            </div>
            <form onSubmit={handleSubmit}>
                <label>Give Your Routine a Name: </label>
                <br/>
                <input type="text" placeholder="Name" value={routineName} onChange={(e) => setRoutineName(e.target.value) }/>
                <br/>
                <br/>
                <div>
                    <h4>Excercises: </h4>
                    <ul>
                        {displayWorkoutNames}
                    </ul>
                </div>
                {/* <label>Would you like to Post this routine for others?</label>
                <br/> */}
                {/* <input type="text"/> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default RoutineCreating