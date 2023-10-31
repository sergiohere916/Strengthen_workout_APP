import React, { useEffect, useState } from "react";
// import { UserContext } from "./Context";
import NavBar from "./NavBar";
import RoutineItem from "./RoutineItem";



function Routines({addNewUserRoutine}) {
    
   
    
    const [allRoutines, setAllRoutines] = useState([])
    //MAYBE REMOVE SCHEDULED WORKOUTS FROM GET?
    useEffect(() => {
        fetch('/routines')
        .then(r => r.json())
        .then(routinesData => setAllRoutines(routinesData))
    }, [])

    const viewableRoutines = allRoutines.filter((routine) => routine.shared === true)


    const allRoutineCards = viewableRoutines.map((routine) => {
        return <RoutineItem key={routine.id} routine={routine} addNewUserRoutine={addNewUserRoutine}/>
    })

    return (
        <div>
            <NavBar/>
            <div id="freeRoutinesImage">
                {/* <div className="freeRoutinesImageHolder"><img src="https://www.eatthis.com/wp-content/uploads/sites/4/2022/09/man-intense-workout.jpg?quality=82&strip=1" alt="battle_rope_workout"/></div>
                <div className="freeRoutinesImageHolder"><img src = "https://shop.lifefitness.com/cdn/shop/products/battle-rope-training-female-1000x1000_740x.jpg?v=1660664778" alt="battle_rope_workout2"/></div> */}
            </div>
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