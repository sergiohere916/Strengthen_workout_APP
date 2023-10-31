import React from "react";
import Button from '@mui/material/Button';
import DayRoutineItem from "./DayRoutineItem";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function CurrentRoutine({myWeeksRoutine, updateTargetUserRoutine}) {
 
    const Monday = myWeeksRoutine.filter((routine) => routine["day_of_week"] == "Monday")[0]
    const Tuesday = myWeeksRoutine.filter((routine) => routine["day_of_week"] == "Tuesday")[0]
    const Wednesday = myWeeksRoutine.filter((routine) => routine["day_of_week"] == "Wednesday")[0]
    const Thursday = myWeeksRoutine.filter((routine) => routine["day_of_week"] == "Thursday")[0]
    const Friday = myWeeksRoutine.filter((routine) => routine["day_of_week"] == "Friday")[0]
    const Saturday = myWeeksRoutine.filter((routine) => routine["day_of_week"] == "Saturday")[0]
    const Sunday = myWeeksRoutine.filter((routine) => routine["day_of_week"] == "Sunday")[0]
    
    



    return (
        <div id="secondContent">
            <h1>Sergio's Current Routine: </h1>
            {/* <Button color = "error" variant="contained" href="/Home/MyRoutines">SHOW ALL SAVED ROUTINES</Button> */}
            <NavLink to = "/Home/MyRoutines"><Button color="error" variant="contained">SHOW ALL SAVED ROUTINES</Button></NavLink>
            <div className="homeRoutineDaysOfWeek">
                    <h3>Monday</h3>
                    <h3>Tuesday</h3>
                    <h3>Wednesday</h3>
                    <h3>Thursday</h3>
                    <h3>Friday</h3>
                    <h3>Saturday</h3>
                    <h3>Sunday</h3>
                </div>
            <div id="homeRoutineContainer">
                <div className="homeRoutineHolders">
                    {Monday ? <DayRoutineItem dayRoutine={Monday} updateTargetUserRoutine={updateTargetUserRoutine}/> : <>false</>}
                </div>
                <div className="homeRoutineHolders">
                    {/* <img src="https://dcassetcdn.com/design_img/3571610/515701/515701_19560887_3571610_166c5b12_image.jpg"></img> */}
                    {Tuesday ? <DayRoutineItem dayRoutine={Tuesday} updateTargetUserRoutine={updateTargetUserRoutine}/> : <>false</>}
                </div>
                <div className="homeRoutineHolders">
                    {Wednesday ? <DayRoutineItem dayRoutine={Wednesday} updateTargetUserRoutine={updateTargetUserRoutine}/> : <>false</>}
                </div>
                <div className="homeRoutineHolders">
                    {Thursday ? <DayRoutineItem dayRoutine={Thursday} updateTargetUserRoutine={updateTargetUserRoutine}/> : <>false</>}
                </div>
                <div className="homeRoutineHolders">
                    {Friday ? <DayRoutineItem dayRoutine={Friday} updateTargetUserRoutine={updateTargetUserRoutine}/> : <>false</>}
                </div>
                <div className="homeRoutineHolders">
                    {Saturday ? <DayRoutineItem dayRoutine={Saturday} updateTargetUserRoutine={updateTargetUserRoutine}/> : <>false</>}
                </div>
                <div className="homeRoutineHolders">
                    {Sunday ? <DayRoutineItem dayRoutine={Sunday} updateTargetUserRoutine={updateTargetUserRoutine}/> : <>false</>}
                </div>
            </div>
        </div>
    )
}

export default CurrentRoutine