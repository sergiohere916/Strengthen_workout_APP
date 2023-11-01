import React from "react";


function CompletedGoals({goal}) {
    console.log(goal)

    return(
        <div className="completedGoals">
            <h4>** {goal.name} **</h4>
        </div>
    )
}

export default CompletedGoals