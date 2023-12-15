import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function EditRoutineForm({routineId, addedWorkouts, addedSetsNReps, onChangeUpdateSetsNReps, addToRoutine, addSetsNReps, removeExerciseFromRoutine, updateUserRoutine}) {
    
    const history = useHistory();
    const [routine, setRoutine] = useState({id:"", sets_n_reps: "1x1,1x1", name: "", workouts: "", likes: "", shared: "" })


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

    // const routineExercises = routine.workouts.split(",");
    // const setsNReps = routine.sets_n_reps.split(",");

   
    const displayAddedExerciseNames = addedWorkouts.map((workout, index) => {
        return <div key={workout + index} className="exerciseToEdit">
        <div className="exerciseNames">{capitalize(workout)} :</div>
            <span> 
                <input className="exerciseSetNReps" min="1" name={0} value={addedSetsNReps[index][0]} onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))} style={{width: 30}} type="number"/> Sets x 
                <input className="exerciseSetNReps" min="1" name={1} value={addedSetsNReps[index][1]} onChange={(e) => onChangeUpdateSetsNReps(Number(e.target.value), index, Number(e.target.name))} style={{width: 30}} type="number"/> Reps
            </span>
            <h6 className="removeExercise" onClick={() => removeExerciseFromRoutine(index)}>Remove</h6>
        </div>
        })

    function capitalize(phrase) {
        const firstLetterCap = phrase.slice(0,1).toUpperCase();
        const remainingPhrase = phrase.slice(1, phrase.length);
        return firstLetterCap + remainingPhrase;
    }
    
    function handleNameChange(e) {
        const newName = e.target.value;
        setRoutine({...routine, name: newName});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const allSetsNReps = addedSetsNReps.map((setNRepPair) => {
            return setNRepPair[0].toString() + "x" + setNRepPair[1].toString();
        });
        const editedRoutine = {...routine, sets_n_reps: allSetsNReps.join(","), workouts: addedWorkouts.join(",")}
        //grab data then fetch patch to update the routine
        //route back to userExercises display
        fetch(`/routines/${routine.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: editedRoutine.name, sets_n_reps: editedRoutine.sets_n_reps, workouts: editedRoutine.workouts})
        })
        .then(res => res.json())
        .then((fullyEditedRoutine) => {
            updateUserRoutine(fullyEditedRoutine, fullyEditedRoutine.id);
            history.push("/Home/MyRoutines");
        })

    }

    return (
        <div id="editRoutineForm">
            <form onSubmit={handleSubmit}>
            {/* <h3>{routine.name}</h3> */}
            <div id="routineEditName">
                <label id="editNameLabel">Routine Name: </label>
                <input id="editNameInput" value={routine.name} type="text" onChange={handleNameChange}/>
            </div>
            <h4 id="routineEditExerciseLabel">Current Exercises: </h4>
            <div id="addedExercisesContainer">
                {displayAddedExerciseNames}
            </div>
            <button id="submitEditButton" type="submit">Complete</button>
            <h5>{routine.id}</h5>
            </form>
        </div>
    )
}



export default EditRoutineForm