import React, { useEffect, useState } from "react";
// import { UserContext } from "./Context";
import NavBar from "./NavBar";
import RoutineItem from "./RoutineItem";
import { Layout, Typography } from "antd";
import battleRope2 from "./battleRope3.jpg"
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";


function Routines({addNewUserRoutine, workouts}) {
    
   
    const history = useHistory()
    const [allRoutines, setAllRoutines] = useState([])
    //MAYBE REMOVE SCHEDULED WORKOUTS FROM GET?
    useEffect(() => {
        fetch("/check_session")
        .then((r) => {
            if (!r.ok) {
                history.push("/Login");
            } 
        } )
    }, [])

    useEffect(() => {
        fetch('/routines')
        .then(r => r.json())
        .then(routinesData => setAllRoutines(routinesData))
    }, [])

    const viewableRoutines = allRoutines.filter((routine) => routine.shared === true)


    const allRoutineCards = viewableRoutines.map((routine) => {
        return <RoutineItem key={routine.id} routine={routine} addNewUserRoutine={addNewUserRoutine} workouts={workouts}/>
    })

    return (
        <div>
            <NavBar/>
            <Layout>
            <div id="routinesPageImageContainer">
                <div id="routinesMainImage">
                    <img src={battleRope2} alt="battleRopeWorkout"/>
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
            </Layout>
            <div id="freeRoutinesIntro">
            <Typography id="routinesBanner">Fitness Routines</Typography>
            <Typography className="bannerDescriptions">Choose from a wide assortment of fitness routines containing popular and effective excercises that best fit your fitness goals.</Typography>
            <Typography className="bannerDescriptions">Use the available options to save routines to your homepage and store them for personal use.</Typography>
            </div>
            <div id="freeRoutinesSorters">
                <NavLink to="/Home/MyRoutines">
                    <button id="viewSavedButton"style={{backgroundColor: "rgba(248, 48, 48, 0.785)", color: "white"}}>View Your Saved Routines</button>
                </NavLink>
            </div>
            <div className="allRoutinesContainer">
                {allRoutineCards}
            </div>
        </div>
    )
}

export default Routines
