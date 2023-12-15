import React from "react";




function UserPersonalGoalItem({goal, updateCompletedGoal, removeDeletedGoal, user}) {

    function handleCompletedGoal() {
        fetch(`/personalgoals/${goal.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({completed: 1})
        })
        .then(r => r.json())
        .then(updatedGoal => {
            updateCompletedGoal(updatedGoal.id);
            alert(`Congratulations ${user.name} on achieving your goal!!`)
        })

    }

    function handleDeletedGoal() {
        fetch(`/personalgoals/${goal.id}`, {
            method: "DELETE"
        })
        .then(removeDeletedGoal(goal.id))
        alert("Deleted but not forgotten. Never give up!")
    }

    return (
        <div className="personalGoal">
            <div className="personalGoalStructure">
                <h4>My Goal:</h4>
                <p>{goal.name}</p>
            </div>
            <div className="personalGoalStructure">
                <h4>Accomplish By:</h4>
                <p>{goal.target_date}</p>
            </div>
            <div className="personalGoalStructure">
                <h4>Status:</h4>
                <div className="goalButtons">
                    <button onClick={handleCompletedGoal}>Completed</button>
                    <br/>
                    <button onClick={handleDeletedGoal}>Delete</button> 
                </div>
            </div>
        </div>
    )
}


export default UserPersonalGoalItem