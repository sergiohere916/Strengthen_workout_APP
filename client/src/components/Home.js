import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import CurrentRoutine from "./CurrentRoutine";
import { UserContext } from "./Context";

import { Layout, Space } from 'antd';

import DisplayExcercise from "./DisplayExcercise";
import UserPersonalGoals from "./UserPersonalGoals";


import CompletedGoals from "./CompletedGoals";
import ExtendedScheduledRoutine from "./ExtendedScheduledRoutine";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Home({myWeeksRoutine, updateTargetUserRoutine, workouts, personalGoals, completedGoals, updateCompletedGoal, removeDeletedGoal, addNewGoal}) {
    
    const history = useHistory()
    const user = useContext(UserContext);
    const [extendedRoutine, setExtendedRoutine] = useState({day_of_week: "", id: "", routine: [], times_completed: 0, user_id: 0});
    const [showExtendedRoutine, setShowExtendedRoutine] = useState(false);
    const [visibility, setVisibility] = useState("100%")


    const inHome = 1;
    const displayCompletedGoals = completedGoals.map((goal) => {
        return <CompletedGoals key={goal.id} goal={goal}/>
    })

    useEffect(() => {
        fetch("/check_session")
        .then((r) => {
            if (!r.ok) {
                history.push("/Login");
            } 
        } )
    }, [])
    

    function displayExtendedRoutine(selectedRoutine) {
        setExtendedRoutine(selectedRoutine);
        setShowExtendedRoutine(true);
        setVisibility("50%");
    }

    function hideExtendedRoutine() {
        setShowExtendedRoutine(false);
        setVisibility("100%");
    }
    
    return (
        <div id="homePage">
            <NavBar/>
            <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
                <Layout>
                <div id="homeImageContainer" >
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://www.orbitfitness.com.au/modules/prestablog/views/img/grid-for-1-7/up-img/thumb_6281.jpg?fa76d5fdcf40fa4cd56045f46c20c786" alt="WomanWorkout"/>
                    </div>
                    <div className="homeImageHolders">
                    <img className="homeImages" src="https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/My-project-2022-02-09T120118.189.jpg?quality=82&strip=1" alt="WomanWorkout2"/>
                    </div>
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://www.viewbug.com/media/mediafiles/2019/03/04/83659692_large1300.jpg" alt="WomanWorkout"/>
                    </div>
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://www.ama-assn.org/sites/ama-assn.org/files/styles/related_article_stub_image_1200x800_3_2/public/2023-01/2022-12-05-MOREACTIVITY-Index_1170x780.jpg?itok=466M3EjJ" alt="WomanWorkout"/>
                    </div>
                    <div className="homeImageHolders">
                        <img className="homeImages" src="https://miro.medium.com/v2/resize:fit:839/0*YXGhd8vuuZNGAHG0.jpg" alt="WomanWorkout"/>
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
                <div id="routineAndDisplay">
                <CurrentRoutine myWeeksRoutine={myWeeksRoutine} updateTargetUserRoutine={updateTargetUserRoutine} displayExtendedRoutine={displayExtendedRoutine} inHome ={inHome} visibility={visibility}/>
                    {showExtendedRoutine? (<ExtendedScheduledRoutine extendedRoutine={extendedRoutine} updateTargetUserRoutine={updateTargetUserRoutine} hideExtendedRoutine={hideExtendedRoutine}/>): (<></>)}
                </div>
                <div id="homeContent3TitleContainer">
                    <div id="homeContent3Title1">
                        <h1>Look Up Your Excercises For Some Assistance</h1>
                    </div>
                </div>
                    <div id="homeContent3">
                        <DisplayExcercise myWeeksRoutine={myWeeksRoutine} workouts={workouts}/>
                        <div id="displayBonus">
                            <h2>Your Fitness Journey Starts Today</h2>
                            <h2>Things are accomplished one step at a time</h2>
                        </div>
                    </div>
                <div id="homeContent4TitleContainer">
                    <div id="homeContent4Title1">
                        <h1>Set Up Some Goals For Yourself</h1>
                    </div>
                </div>
                <div id="homeContent4">
                    <div id="homeContent4Titles">
                        <div className="homeCont4Title"><h4>Your Personal Goals:</h4></div>
                        <div className="homeCont4Title"><h4>Your Achievements:</h4></div>
                    </div>
                    <div id="homeContent4Content">
                        <UserPersonalGoals personalGoals={personalGoals} user={user} updateCompletedGoal={updateCompletedGoal} removeDeletedGoal={removeDeletedGoal} addNewGoal={addNewGoal}/>
                        <div id="goalsMet">
                            <div>
                                <br/>
                            </div>
                             <div>
                                <br/>
                            </div>
                            <div id="allPersonalInfo">
                                <div className="infoItem">
                                    <h4>Member since: {user.account_created} </h4>
                                    <h4>Self goals met to date: {completedGoals.length}</h4>
                                    <h4>Completed Goals History: </h4>
                                </div>
                                <div id="completedGoalsContainer">
                                    {displayCompletedGoals}  
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>  
                </Layout>
            </Space>
        </div>
    )
}

export default Home