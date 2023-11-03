import React, { useContext, useEffect, useState } from "react";
import glossy from "./glossy-red-push-pin-png.webp";
import UserPersonalGoalItem from "./UserPersonalGoalItem";
import { UserContext } from "./Context";

function UserPersonalGoals({personalGoals, user, updateCompletedGoal, removeDeletedGoal, addNewGoal}) {
    const [goalDesc, setGoalDesc] = useState("");
    const [targetDate, setTargetDate] = useState("");

    const displayGoals = personalGoals.map((goal) => {
        return <UserPersonalGoalItem key={goal.id} goal={goal} updateCompletedGoal={updateCompletedGoal} removeDeletedGoal={removeDeletedGoal}/>
    })


    const today = new Date().toISOString().split("T")[0];
    function handleClick() {
       
        console.log("NEED TO INSERT INFORMATION");
        console.log(goalDesc);
        console.log(targetDate);
    }

    function handleSubmit(e) {
        e.preventDefault();
         const newGoal = {
            name: goalDesc,
            target_date: targetDate,
            user_id: user.id
        }
        fetch("/personalgoals", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newGoal)
        })
        .then(r => r.json())
        .then(newGoal => addNewGoal(newGoal))
        setGoalDesc("");
        setTargetDate("");
    }



    



    return (
        <div id="setGoals">
            {/* <div className="goalsPins">
                <div className="goalsPin1">
                    <img src={glossy} alt="red_Pin"/>
                </div>
                <div className="goalsPin2">
                    <img src={glossy} alt="red_Pin"/>
                </div>
            </div> */}
            <div className="setNewGoal">
                <button onClick={handleClick}>Set New Goal</button>
                
            </div>
            <div id="newGoalFormContainer">
                <form className="newGoalForm" onSubmit={handleSubmit}>
                    <div className="goalInput1">
                        <label>Set Your Goal: </label>
                        <input type="text" required value={goalDesc} onChange={(e) => setGoalDesc(e.target.value)}/>
                    </div>
                    <div className="goalInput2">
                        <label>Set a Target Date: </label>
                        <input type="date" required min={today} value={targetDate} onChange={(e) => setTargetDate(e.target.value)}/>
                    </div>
                    <div className="goalInput3">
                        <br/>
                        <button type="submit">Set</button>
                    </div>
                </form>
            </div>
            <div id="allPersonalGoals">
                {displayGoals}
           
            </div>
        </div>
    )
}

export default UserPersonalGoals