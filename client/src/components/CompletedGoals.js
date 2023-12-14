import React from "react";


function CompletedGoals({goal}) {
    
    return(
        <div className="completedGoals">
            <div style={{position: "absolute", left: 0}} className="trophies">
             <img src="https://pngimg.com/uploads/golden_cup/golden_cup_PNG94633.png" alt="trophy"/>
            </div>
            <h4 style={{color: "gold", fontWeight: "bold", fontSize: "15pt", WebkitTextStroke: ".5px black"}}>** {goal.name} **</h4>
            <div style={{position: "absolute", right: 0}} className="trophies">
                <img src="https://pngimg.com/uploads/golden_cup/golden_cup_PNG94633.png" alt="trophy"/>
            </div>
        </div>
    )
}

export default CompletedGoals