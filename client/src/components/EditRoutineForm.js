import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";


function EditRoutineForm({userId, routineId}) {
    const [routine, setRoutine] = useState({id:"", sets_n_reps: "1x1,1x1", name: "", workouts: "", likes: "", shared: "" })
    
    useEffect(() => {
        fetch(`/routines/${routineId}`)
        .then(res => res.json())
        .then((routine) => setRoutine(routine))
    }, [])

    const routineExercises = routine.workouts.split(",");
    const setsNReps = routine.sets_n_reps.split(",");
    // const setNRepPair = setsNReps[0].split("x");
    // console.log(setNRepPair);

    function removeExercise(targetIndex) {
        const updatedRoutineExercises = routineExercises.filter((exercise, index) => index !== targetIndex );
        const updatedRoutineSets = setsNReps.filter((setNRep, index) => index !== targetIndex );
        const exercises = updatedRoutineExercises.join(",");
        const setsNRepsUpdated = updatedRoutineSets.join(",");
        alert(exercises);
        const newRoutine = {...routine, workouts: exercises, sets_n_reps: setsNRepsUpdated};
        setRoutine(newRoutine);  
    }
    // onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))}
    // onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))}
    
    const displayExerciseNames = routineExercises.map((workout, index) => {
        return <div style={{backgroundColor: "white"}}><li>{workout} {index}
        <span>
            <input name={0} value={setsNReps[index].split("x")[0]}  style={{width: 30}} type="number"/>
            Sets x 
            <input name={1} value={setsNReps[index].split("x")[1]}  style={{width: 30}} type="number"/>Reps
        </span>
        <h6 style={{color: "blue"}} onClick={() => removeExercise(index)}>Remove</h6>
        <hr/>
        </li>
        </div>})

    return (
        <div>
            <form>
            <h3>{routine.name}</h3>
            <input defaultValue={routine.name}/>
            <h5>Current Exercises: </h5>
            <ul>
                {displayExerciseNames}
            </ul>
            <h5>{routine.id}</h5>
            </form>
        </div>
    )
}



export default EditRoutineForm