import React, {useEffect} from "react";
import NavBar from "./NavBar";
import UserRoutineItem from "./UserRoutineItem";
import CurrentRoutine from "./CurrentRoutine";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function UserRoutines({myRoutines, myWeeksRoutine, updateTargetUserRoutine, removeUserRoutine}) {
    
    const history = useHistory()
    
    useEffect(() => {
        fetch("/check_session")
        .then((r) => {
            if (!r.ok) {
                history.push("/");
            } 
        } )
    }, [])



    const userRoutines = myRoutines.map((userRoutine) => {
        return <UserRoutineItem key={userRoutine.id} userRoutine={userRoutine} updateTargetUserRoutine={updateTargetUserRoutine} myWeeksRoutine={myWeeksRoutine} removeUserRoutine={removeUserRoutine}/>
    })
    const inHome = 0;


    return (
        <div>
            <NavBar/>
            <div id="userPageImageContainer" >
                    <div className="userPageImageHolders">
                        <img className="userPageImage" src="https://www.losangelespropertymanagementgroup.com/wp-content/uploads/2020/09/alicgym.jpeg" alt="Weight-Lifting-Equipment"/>
                    </div>
            </div>
            <div className="reusableHomeAppTitleContainer">
                <div className="homeAppTitles">
                    <h1 className="homeTitle1">SET YOUR WORKOUTS</h1>
                    <h3>Strive for consistency</h3>
                </div>
                <div className="homeAppTitles">
                    <h1 className="homeTitle2">STRENGTHEN</h1>
                    <h3>The only easy day was yesterday</h3>
                </div>
                <div className="homeAppTitles">
                    <h1 className="homeTitle3">SET YOUR GOALS</h1>
                    <h3>Seek to accomplish them</h3>
                </div>
            </div>
            <CurrentRoutine myWeeksRoutine={myWeeksRoutine} updateTargetUserRoutine={updateTargetUserRoutine} inHome={inHome}/>
            <div id="userRoutinesTitleContainer">
                <div id="userRoutinesTitle1">
                    <h1>Set Up Your Week's Routine</h1>
                    <h4>Create some routines or look up some of our preset routines to add to your profile.</h4>
                </div>
            </div>
            <div id="userPage">
                <div id = "userRoutinesContainer">
                    {userRoutines}
                </div>
            </div>
        </div>
    )
}

export default UserRoutines
