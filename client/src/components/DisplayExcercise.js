import React, { useState } from "react";


function DisplayExcercise({myWeeksRoutine, workouts}) {
    const [selectedRoutineName, setSelectedRoutineName] = useState("")
    const [selectedVisual, setSelectedVisual] = useState("")
    // const [selectedExcercise, setSelectedExcercise] = useState("")
    const [currentGif, setCurrentGif] = useState([])
    
    



    const excerciseOptionsList = myWeeksRoutine.filter((scheduledRoutine) => scheduledRoutine["day_of_week"] === selectedRoutineName);
    let excerciseOptions;
    if (excerciseOptionsList.length > 0) {
        // console.log("THIS FUNCTION CAN NOW RUN")
        // console.log(excerciseOptionsList[0].routine.workouts)
        excerciseOptions = excerciseOptionsList[0].routine.workouts.split(",").map((excercise) => {
        return <option key={Math.random()*1000} value={excercise}>{excercise}</option>
        })
    }
    
    // console.log("in Current Routine")
    // console.log(myWeeksRoutine)
    // console.log(Array.isArray(excerciseOptions))
    // console.log("LENGTH OF OPTIONS LIST");
    // console.log(excerciseOptionsList[0].routine.workouts.split(","))
    
    

    function handleSubmit(e) {
        e.preventDefault();
        const excerciseName = e.target[2].value
        console.log(excerciseName)
        const visualType = selectedVisual
        retrieveDisplay(visualType, excerciseName);
    }

    function retrieveDisplay(visualType, excerciseName) {
        const gif = workouts.filter((workout) => workout.name === excerciseName)[0].gifUrl
        // console.log(gif)
        setCurrentGif([<img src={gif} alt="workout_Gif"/>])
    }

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
                    <label>Instructions/ Clip </label>
                    <select name="display" required select={selectedVisual} onChange={(e) => setSelectedVisual(e.target.value)}>
                        <option value=""></option>
                        <option value="Instructions">Instructions</option>
                        <option value="Example">Example Clip</option>
                    </select>
                    <label>Which Excercise </label>
                    <select name="excercise" required>
                        <option value=""></option>
                        {/* {Array.isArray(excerciseOptions)? excerciseOptions : <></>} */}
                        {excerciseOptions}
                    </select>
                    <button type="submit">Go</button>
                </form>
            </div>
            <div id="excerciseInfoContainer">
                <div id="exeriseInfo1">
                    {currentGif}
                </div>
                <div id="exerciseInfo2">
                    
                </div>    
            </div>
            
        </div>
    )
}


export default DisplayExcercise