import React from "react";

function RoutineCreating({currentWorkouts, onClickClearCurrentRoutine}) {
    const displayWorkoutNames = currentWorkouts.map((workout) => {return <button>{workout}</button>})

    function handleClick() {
        onClickClearCurrentRoutine()
    }

    return (
        <div>
            <button onClick={handleClick}>CLEAR ALL</button>
            {displayWorkoutNames}
            <form>

            </form>
        </div>
    )
}


export default RoutineCreating