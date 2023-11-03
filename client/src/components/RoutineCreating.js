import React, { useState } from "react";
import { Alert, Button, Input, Space } from 'antd';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


function RoutineCreating({currentWorkouts, onClickClearCurrentRoutine, addNewUserRoutine, user}) {
    const [routineName, setRoutineName] = useState("")
    const [invalidEntry, setInvalidEntry] = useState(false)
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)
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
                    setInvalidEntry(false);
                    setSuccessfulSubmit(true);
                })
            })
            //ADD THE NEW ROUTINE INTO STATE SO IT CAN BE SENT TO ROUTINES PAGE will need function
            //ADD scheduledworkot into state as well and send up with function same as routine
        } else {
            console.log("SOME LOGIC TO DISPLAY ERROR");
            setInvalidEntry(true)
        }
    }

    function removePopUp() {
        setSuccessfulSubmit(false);
        
    }

    return (
        <div>
            <div>
            <Button size="small" style={{backgroundColor: "red", color: "white", border: "1px solid black"}} onClick={handleClick}>CLEAR ALL</Button>
            
            </div>
            <form style = {{marginTop: "15px"}}onSubmit={handleSubmit}>
                <label style={{fontWeight: "bold", fontSize: "13pt"}}>Give Your Routine a Name: </label>
                <br/>
                <input style={{marginTop: "5px"}}type="text" required placeholder="Name" value={routineName} onChange={(e) => setRoutineName(e.target.value) }/>
                <br/>
                <br/>
                <div>
                    <h4>Add</h4>
                    <h4>Excercises: </h4>
                    <ul style={{fontSize: "13pt"}}>
                        {displayWorkoutNames}
                    </ul>
                </div>
                {/* <label>Would you like to Post this routine for others?</label>
                <br/> */}
                {/* <input type="text"/> */}
                <button type="submit">Submit</button>
            </form>
            {invalidEntry? <h5 style={{color: "red"}}>Error: Need to include at least one exercise</h5>  : <h5></h5>}
            {successfulSubmit? 
                // <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{marginLeft: "15px", marginRight: "15px"}}>
                    <Alert
                        style={{backgroundColor: "white"}}
                        message="New routine created, view in saved routines?"
                        
                        type="info"
                        action={
                            <Space direction="vertical">
                                <NavLink to = "/Home/MyRoutines">
                                    <Button size="small" type="primary" style={{backgroundColor: "rgba(255, 123, 0, 0.836)"}}>
                                        View
                                    </Button>
                                </NavLink>
                                <Button onClick={removePopUp}size="small" type="primary" style={{backgroundColor: "red"}}>
                                    Decline
                                </Button>
                            </Space>
                        }
                    />
                </div>
                // </Space>
            : 
            
            <></>}
        </div>
    )
}


export default RoutineCreating

{/* <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                    message="Info Text"
                    description="Info Description Info Description Info Description Info Description"
                    type="info"
                    action={
                        <Space direction="vertical">
                        <Button size="small" type="primary">
                            Accept
                        </Button>
                        <Button size="small" danger ghost>
                            Decline
                        </Button>
                        </Space>
                    }
                closable
                />
            </Space> */}