import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import WorkoutsList from "./WorkoutsList";


function App() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([
  {
    bodyPart: "shoulders",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/YIvmcwFlMFdQMg",
    id: "2137",
    instructions: ["Sit on a bench with your feet flat on the ground and your back straight.", "Hold a dumbbell in one hand with your palm facing inwards.", "Lean forward and place your free hand on the bench for support.",
     "Keep your arm slightly bent and raise it out to the side until it is parallel to the ground.", "Pause for a moment at the top, then slowly lower your arm back down to the starting position.", "Repeat for the desired number of repetitions, then switch arms."],
    name: "dumbbell arnold press",
    target: "delts"
  }, 
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "0288",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell decline bench press",
    target: "pectorals"
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "3",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals"
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "4",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals"
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "5",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals"
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "6",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals"
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "7",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals"
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "8",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals"
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/JJ0bZGJiGJVXpL",
    id: "9",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals"
  }])

  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function onLogIn(currentUserLogin) {
    setUser(currentUserLogin)
  }

  console.log(user)
  console.log(workouts)

  // useEffect(() => {
  //   fetch("https://exercisedb.p.rapidapi.com/exercises?limit=1200",{
  //     method: "GET",
  //     headers: {
  //       'X-RapidAPI-Key': REACT_APP_API_KEY,
  //       'X-RapidAPI-Host': REACT_APP_API_HOST
  //   }})
  //   .then(res => res.json())
  //   .then(data => console.log(data))
  // })



  // if (user) {
  //   return (
  //     <div className="page">
  //       <NavBar/>
  //       <Home/>
  //       <Switch>
  //         <Route path="/workouts">
  //           <WorkoutsList/>
  //         </Route>
  //       </Switch>
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className="login">
  //       <Login onLogIn={onLogIn}/>
  //     </div>
  //   )
  // }

  return (
    <div>
    <Switch>
      <Route path="/workouts">
        <WorkoutsList workouts={workouts} user={user}/>
      </Route>
      <Route path = "/Home">
        <Home/>
      </Route>
      <Route exact path = "/">
        <Login onLogIn={onLogIn}/>
      </Route>
    </Switch>
    </div>
  )
    
}

export default App;
