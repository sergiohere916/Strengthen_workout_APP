import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";


function EditRoutineForm({userId, routineId, addedWorkouts, addedSetsNReps, onChangeUpdateSetsNReps, addToRoutine, addSetsNReps, removeExerciseFromRoutine}) {
    const [routine, setRoutine] = useState({id:"", sets_n_reps: "1x1,1x1", name: "", workouts: "", likes: "", shared: "" })
    //Attempting to consolidate displaying of exercises to just one way, through the onChange method
    useEffect(() => {
        fetch(`/routines/${routineId}`)
        .then(res => res.json())
        .then((routine) => {
           
            const routineExercises = routine.workouts.split(",");
            const setsNReps = routine.sets_n_reps.split(",");
            addToRoutine(routineExercises);
            addSetsNReps(setsNReps);
            setRoutine(routine)
        })
    }, [])

    const routineExercises = routine.workouts.split(",");
    const setsNReps = routine.sets_n_reps.split(",");


    // function removeExercise(targetIndex) {
    //     const updatedRoutineExercises = routineExercises.filter((exercise, index) => index !== targetIndex );
    //     const updatedRoutineSets = setsNReps.filter((setNRep, index) => index !== targetIndex );
    //     const exercises = updatedRoutineExercises.join(",");
    //     const setsNRepsUpdated = updatedRoutineSets.join(",");
    //     const newRoutine = {...routine, workouts: exercises, sets_n_reps: setsNRepsUpdated};
    //     setRoutine(newRoutine);  
    // }
    
    //remove this since it's now been consolidated
    // const displayExerciseNames = routineExercises.map((workout, index) => {
    //     return <div style={{backgroundColor: "white"}}><li>{workout} {index}
    //     <span>
    //         <input name={0} value={setsNReps[index].split("x")[0]}  style={{width: 30}} type="number"/>
    //         Sets x 
    //         <input name={1} value={setsNReps[index].split("x")[1]}  style={{width: 30}} type="number"/>Reps
    //     </span>
    //     <h6 style={{color: "blue"}} onClick={() => removeExercise(index)}>Remove</h6>
    //     <hr/>
    //     </li>
    //     </div>})

    //rename this?
    const displayAddedExerciseNames = addedWorkouts.map((workout, index) => {
        return <div className="exerciseToEdit">{capitalize(workout)} {index}
        <br/>
        <span> 
            <input name={0} value={addedSetsNReps[index][0]} onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))} style={{width: 30}} type="number"/>
            Sets x 
            <input name={1} value={addedSetsNReps[index][1]} onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))} style={{width: 30}} type="number"/>Reps
        </span>
        <h6 style={{color: "blue"}} onClick={() => removeExerciseFromRoutine(index)}>Remove</h6>
        
        </div>
        })

    function capitalize(phrase) {
        const firstLetterCap = phrase.slice(0,1).toUpperCase();
        const remainingPhrase = phrase.slice(1, phrase.length);
        return firstLetterCap + remainingPhrase;
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        //grab data then fetch patch to update the routine
        //route back to userExercises display
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h3>{routine.name}</h3>
            <input defaultValue={routine.name}/>
            <h5>Current Exercises: </h5>
            <div>
                {displayAddedExerciseNames}
            </div>
            <button type="submit">Complete</button>
            <h5>{routine.id}</h5>
            </form>
        </div>
    )
}



export default EditRoutineForm