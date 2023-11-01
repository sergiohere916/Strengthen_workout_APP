import React from "react";




function UserPersonalGoalItem({goal}) {



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
                    <button>Completed !</button>
                    <br/>
                    <button>Delete</button> 
                </div>
            </div>
        </div>
    )
}


export default UserPersonalGoalItem