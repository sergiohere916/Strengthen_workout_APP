import React, { useState } from "react";
import { Alert, Button, Input, Space } from 'antd';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


function RoutineCreating({currentWorkouts, currentSetsNReps, onChangeUpdateSetsNReps, onClickClearCurrentRoutine, addNewUserRoutine, user, removeExerciseFromRoutine}) {
    const [routineName, setRoutineName] = useState("")
    const [invalidEntry, setInvalidEntry] = useState(false)
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)
    // const [sharedStatus, setSharedStatus] = useState(null)

    function handleSetRepChange(e) {
        const index = Number(e.target.name[0]) + 1;
        console.log(e.target.name.split(",")[0]);
        
        

    }

function capitalize(phrase) {
    const firstLetterCap = phrase.slice(0,1).toUpperCase();
    const remainingPhrase = phrase.slice(1, phrase.length);
    return firstLetterCap + remainingPhrase;
}

    const displayWorkoutNames = currentWorkouts.map((workout, index) => {
        return <div className="addedExercises">
        <div className="addedExerciseNames">{capitalize(workout)} {index} :</div>
            <span> 
                <input name={0} value={currentSetsNReps[index][0]} onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))} style={{width: 30}} type="number"/>
                Sets x 
                <input name={1} value={currentSetsNReps[index][1]} onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))} style={{width: 30}} type="number"/>Reps
            </span>
            <h6 className="removeAddedExercise" onClick={() => removeExerciseFromRoutine(index)}>Remove</h6>
        </div>
        })
    

    function handleClick() {
        onClickClearCurrentRoutine()
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        const allSetsNReps = currentSetsNReps.map((setNRepPair) => {
            return setNRepPair[0].toString() + "x" + setNRepPair[1].toString();
        });
        console.log(allSetsNReps.join(","));
        
        if (currentWorkouts.length >= 1) {
            const newRoutine = {
                name: routineName,
                workouts: currentWorkouts.join(","),
                sets_n_reps: allSetsNReps.join(","),
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
    //RETURN TO START POINT
    return (
        <>
            <div>
            </div>
            <form style = {{marginTop: "15px"}}onSubmit={handleSubmit}>
                <div id="routineName">
                    <label id="routineNameLabel" style={{fontWeight: "bold"}}>Give Your Routine a Name: </label>
                    <input id = "routineNameInput"type="text" required placeholder="Name" value={routineName} onChange={(e) => setRoutineName(e.target.value) }/>
                </div>
                <h4 id="addExercisesLabel">Add Exercises: </h4>
                <div id="exercisesContainer">
                    {displayWorkoutNames}
                </div>
                <div id="submitAndClearButtons">
                    <button id = "submitRoutineButton" type="submit">Submit</button>
                    <button id="clearRoutineButton" onClick={handleClick} type="reset">Clear Routine</button>
                </div>
            </form>
            {invalidEntry? <h5 id="errorMessage" style={{color: "red"}}>Error: Need to include at least one exercise</h5>  : <h5></h5>}
            {successfulSubmit? 
                // <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{marginRight: "20px"}}>
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
        </>
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