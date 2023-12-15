import React from "react";
import Typography from "antd/es/typography/Typography";

function ExtendedScheduledRoutine({extendedRoutine, updateTargetUserRoutine, hideExtendedRoutine}) {
    const {routine} = extendedRoutine; 

    const excercisesList = routine.workouts.split(",");
    const setsNReps = routine.sets_n_reps.split(",");
    const excercises = excercisesList.map((excercise, index) => {
        const currSetNRepPair = setsNReps[index].split("x");
        return (<div key={excercise + index}>
            <Typography style={{color: "rgb(236, 121, 44)", fontSize: "13pt", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.700)"}} className="exercises">{index + 1 + "."} {capitalize(excercise)}</Typography>
            <Typography style= {{color: "white"}}className="setNRep">{currSetNRepPair[0]} Sets x {currSetNRepPair[1]} Reps</Typography>
            </div>)
    })


    function capitalize(phrase) {
        const firstLetterCap = phrase.slice(0,1).toUpperCase();
        const remainingPhrase = phrase.slice(1, phrase.length);
        return firstLetterCap + remainingPhrase;
    }

    function handleClick() {
        const completedTotal = extendedRoutine.times_completed + 1;
        fetch(`/scheduledworkouts/${extendedRoutine.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({times_completed: completedTotal})
        })
        .then(res => res.json())
        .then(updatedRoutine => updateTargetUserRoutine(updatedRoutine.id, updatedRoutine["times_completed"], "times_completed" ))
    }

    return (
        <div id="extendedRoutineDisplay">
            <div id="header" style={{color: "white"}}>
                <Typography style={{color: "white", fontSize: "15pt", textAlign: "center"}}>{routine.name}</Typography>
                <Typography id="headerCloser" onClick={hideExtendedRoutine}>Close</Typography>
            </div>
            <div id="body">
                <h3 style={{marginLeft: "5px", color: "white", fontSize: "13pt"}}>Workouts:</h3>
                <hr style={{color: "black"}}/>
                <div id="extendedDisplayExercises">
                {excercises}
                </div>
            </div>
            <div id="footer">
                <div id="footerContent1">
                    <div>
                        <Typography style={{color: "white"}}>Mark this routine as completed today: </Typography>
                    </div>
                    <div id="timesCompleted">
                        <Typography style={{marginLeft: "10px", color: "rgb(236, 121, 44)", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.700)"}}>Times Completed: {extendedRoutine.times_completed} </Typography>
                    </div>
                </div>
                <div id="button" onClick={handleClick}>
                        <Typography>Workout Completed</Typography>
                        <div id="checkBox">
                            <img id="checkBoxPic" src="https://www.cabinetrefacingtogo.com/wp-content/uploads/2022/04/check-box.png"/>
                        </div>
                </div>
                
            </div>
        </div>
    )
}


export default ExtendedScheduledRoutine;