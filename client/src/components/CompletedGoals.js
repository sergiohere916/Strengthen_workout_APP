import React from "react";


function CompletedGoals({goal}) {
    
    return(
        <div className="completedGoals">
            <div className="trophies">
             <img src="https://pngimg.com/uploads/golden_cup/golden_cup_PNG94633.png" alt="trophy"/>
            </div>
            <h4 style={{color: "gold", fontWeight: "bold", fontSize: "15pt", WebkitTextStroke: "1px black"}}>** {goal.name} **</h4>
            <div className="trophies">
                <img src="https://pngimg.com/uploads/golden_cup/golden_cup_PNG94633.png" alt="trophy"/>
            </div>
        </div>
    )
}

export default CompletedGoals