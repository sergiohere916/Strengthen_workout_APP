import React from "react";
import NavBar from "./NavBar";
import UserRoutineItem from "./UserRoutineItem";
import CurrentRoutine from "./CurrentRoutine";


function UserRoutines({myRoutines, myWeeksRoutine, updateTargetUserRoutine, removeUserRoutine}) {
  

    const userRoutines = myRoutines.map((userRoutine) => {
        return <UserRoutineItem key={userRoutine.id} userRoutine={userRoutine} updateTargetUserRoutine={updateTargetUserRoutine} myWeeksRoutine={myWeeksRoutine} removeUserRoutine={removeUserRoutine}/>
    })

    // const currentRoutines = myWeeksRoutine.map((weekdayRoutine) => {
    //     return <CurrentRoutine key={weekdayRoutine.id} weekdayRoutine={weekdayRoutine}/>
    // })

    return (
        <div>
            <NavBar/>
            <div id="userPageImageContainer" >
                    <div className="userPageImageHolders">
                        <img className="userPageImage" src="https://www.losangelespropertymanagementgroup.com/wp-content/uploads/2020/09/alicgym.jpeg" alt="Weight-Lifting-Equipment"/>
                    </div>
            </div>
            <CurrentRoutine myWeeksRoutine={myWeeksRoutine} updateTargetUserRoutine={updateTargetUserRoutine}/>
            <div id="userPage">
                <div id = "userRoutinesContainer">
                    {userRoutines}
                </div>
                <div id="userPageWeeklyRoutine">
                    <h5>Assign your Weekly Workout Routine</h5>
                    <h4>Monday:</h4>
                    <h4>Tuesday: </h4>
                </div>
            </div>
        </div>
    )
}

export default UserRoutines
// https://www.losangelespropertymanagementgroup.com/wp-content/uploads/2020/09/alicgym.jpeg

// https://static.toiimg.com/thumb/msid-67925826/67925826.jpg?width=500&resizemode=4