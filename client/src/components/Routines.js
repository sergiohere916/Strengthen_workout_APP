import React, { useEffect, useState } from "react";
// import { UserContext } from "./Context";
import NavBar from "./NavBar";
import RoutineItem from "./RoutineItem";
import { Layout } from "antd";
import battleRope2 from "./battleRope3.jpg"


function Routines({addNewUserRoutine, workouts}) {
    
   
    
    const [allRoutines, setAllRoutines] = useState([])
    //MAYBE REMOVE SCHEDULED WORKOUTS FROM GET?
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
            <h1 id="routinesBanner">Fitness Routines</h1>
            <p>Choose from a wide assortment the routines containing popular and effective excercises that best fit your fitness goals, use the </p>
            <p>available options to save them to your homepage and store them for personal review and use</p>
            </div>
            <div id="freeRoutinesSorters">

            </div>
            <div className="allRoutinesContainer">
                {allRoutineCards}
            </div>
        </div>
    )
}

export default Routines

// https://img.freepik.com/premium-photo/battle-ropes-exercise-during-crossfit-training-gym-athlete-wear-red-shorts-working-out-with-rope-sport-motivation-concept-copy-space_403156-207.jpg

// https://www.eatthis.com/wp-content/uploads/sites/4/2022/09/man-intense-workout.jpg?quality=82&strip=1