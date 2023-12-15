import React, { useState } from "react";


function DisplayExcercise({myWeeksRoutine, workouts}) {
    const [selectedRoutineName, setSelectedRoutineName] = useState("")
    // const [selectedExcercise, setSelectedExcercise] = useState("")
    const [currentGif, setCurrentGif] = useState([])
    const [currentInstructions, setCurrentInstructions] = useState([])
    
    



    const excerciseOptionsList = myWeeksRoutine.filter((scheduledRoutine) => scheduledRoutine["day_of_week"] === selectedRoutineName);
    let excerciseOptions;
    if (excerciseOptionsList.length > 0) {
        excerciseOptions = excerciseOptionsList[0].routine.workouts.split(",").map((excercise) => {
        return <option key={Math.random()*1000} value={excercise}>{excercise}</option>
        })
    }
    
    

    function handleSubmit(e) {
        e.preventDefault();
        const excerciseName = e.target[1].value
        retrieveDisplay(excerciseName);
    }

    function retrieveDisplay(excerciseName) {
        const gif = workouts.filter((workout) => workout.name === excerciseName)[0].gifUrl
        const instructions = workouts.filter((workout) => workout.name === excerciseName)[0].instructions
        setCurrentInstructions(instructions);
        setCurrentGif([<img className="exampleClip" src={gif} alt="workout_Gif"/>]);
    }


    function clearClip() {
        setCurrentGif([]);
    }

    function clearInstructions() {
        setCurrentInstructions([]);
    }
    const instructionsDisplayed = currentInstructions.map((instructions, index) => {
        return <li key={instructions + index}>{instructions}</li>
    })

    return (
        <div id="displayExcersiseInfo">
            <div id="exerciseFormContainer">
                <form onSubmit={handleSubmit}>
                    <label>Select Your Routine </label>
                    <select name="routine" select={selectedRoutineName} required onChange={(e) => setSelectedRoutineName(e.target.value)}>
                        <option value=""></option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>
                    <label>Which Excercise </label>
                    <select name="excercise" required>
                        <option value=""></option>
                        {excerciseOptions}
                    </select>
                    <button type="submit">Go</button>
                </form>
            </div>
            <div id="exerciseInfoContainer">
                <div id="exeriseInfo1">
                    {currentGif}
                </div>
                <div id="exerciseInfo2">
                    <ol>
                        {instructionsDisplayed}
                    </ol>
                </div>    
            </div>
            <div style={{display: "flex", textAlign: "center"}}>
                <div style={{width: "50%", marginTop: "5px"}}>
                    <button onClick={clearClip}>Clear Clip</button>
                </div>
                <div style={{width: "50%", marginTop: "5px"}}>
                    <button onClick={clearInstructions}>Clear Instructions</button>
                </div>
            </div>
        </div>
    )
}


export default DisplayExcercise