import React, { useEffect, useState} from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./Context";
import Login from "./Login";
import Home from "./Home";
import NavBar from "./NavBar";
import WorkoutsList from "./WorkoutsList";
import UserRoutines from "./UserRoutines";
import CurrentRoutine from "./CurrentRoutine";
import Routines from "./Routines";
import CreateAccount from "./CreateAccount";
import EditRoutines from "./EditRoutines";



function App() {

  // const UsersContext = createContext();
  //CURRENTLY SENDING USER AS STATE VARIABLE TO ROUTINES THEN TO ROUTINEITEM IF FIXED REMOVE THESE PROP DRILLED VARIABLES

  const [user, setUser] = useState({id: null, name: "", personal_goals: []});
  // const [personalGoals, setPersonalGoals] = useState([]);
  // const [completedGoals, setCompletedGoals] = useState([]);
  const [allGoals, setAllGoals] = useState([])

  const [myRoutines, setMyRoutines] = useState([])
  const [workouts, setWorkouts] = useState([
  {
    bodyPart: "shoulders",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/gsi2JrOpM7opeB",
    id: "2137",
    instructions: ["Sit on a bench with your feet flat on the ground and your back straight.", "Hold a dumbbell in one hand with your palm facing inwards.", "Lean forward and place your free hand on the bench for support.",
     "Keep your arm slightly bent and raise it out to the side until it is parallel to the ground.", "Pause for a moment at the top, then slowly lower your arm back down to the starting position.", "Repeat for the desired number of repetitions, then switch arms."],
    name: "dumbbell arnold press",
    target: "delts",
    secondaryMuscles: ["triceps", "upper chest"]
  }, 
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/FEtrmR-uhT870k",
    id: "0288",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell decline bench press",
    target: "pectorals",
    secondaryMuscles: ["triceps", "shoulders"]
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/LV4HBdINaWunn6",
    id: "3",
    instructions: ["Set an incline bench to a 45-degree angle and sit on it with a dumbbell in each hand, palms facing each other.", "Lie back on the bench and press the dumbbells up to the starting position, directly above your chest, with your arms extended.", "Lower the dumbbells out to the sides in a wide arc until you feel a stretch in your chest.", 
    "As you lower the dumbbells, rotate your wrists so that your palms face forward at the bottom of the movement.", "Reverse the motion and bring the dumbbells back up to the starting position, squeezing your chest muscles together at the top.", "Repeat for the desired number of repetitions."],
    name: "dumbbell incline twisted flyes",
    target: "pectorals",
    secondaryMuscles: ["shoulders", "triceps"]
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/LT5nn41xRiqLVL",
    id: "4",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals",
    secondaryMuscles: ["triceps", "shoulders"]
  },
  {
    bodyPart: "chest",
    equipment: "leverage machine",
    gifUrl: "https://v2.exercisedb.io/image/dUit9WsETwxuQI",
    id: "5",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "lever incline chest press",
    target: "pectorals",
    secondaryMuscles: ["shoulders", "triceps"]
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/29gQ4g6rQ4uUMf",
    id: "6",
    instructions: ["Lie on a decline bench with your feet secured and your head lower than your hips.", "Hold a dumbbell in each hand with your palms facing each other and your arms extended above your chest.", "Lower the dumbbells to the sides of your chest, keeping your elbows slightly bent.", 
    "Press the dumbbells back up to the starting position, fully extending your arms.", "Repeat for the desired number of repetitions."],
    name: "dumbbell decline hammer press",
    target: "pectorals",
    secondaryMuscles: ["triceps", "shoulders"]
  },
  {
    bodyPart: "upper arms",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/Jc52rMWNIQUgYS",
    id: "7",
    instructions: ["Stand with your feet shoulder-width apart and hold a dumbbell in each hand.", "Bend your knees slightly and hinge forward at the hips, keeping your back straight.", "Extend your arms straight back, squeezing your triceps at the top of the movement.", 
    "Pause for a moment, then slowly lower the dumbbells back to the starting position.", "Repeat for the desired number of repetitions."],
    name: "dumbbell standing kickback",
    target: "triceps",
    secondaryMuscles: ["shoulders"]
  },
  {
    bodyPart: "upper legs",
    equipment: "barbell",
    gifUrl: "https://v2.exercisedb.io/image/dCoteoj6RcHrVG",
    id: "8",
    instructions: ["Stand with your feet shoulder-width apart, toes slightly turned out.", "Hold the barbell across your upper back, resting it on your traps or rear delts.", "Engage your core and keep your chest up as you lower your hips back and down, as if sitting into a chair.", 
    "Lower until your thighs are parallel to the ground, or as low as you can comfortably go.", "Drive through your heels to stand back up, squeezing your glutes at the top.", "Repeat for the desired number of repetitions."],
    name: "barbell speed squat",
    target: "glutes",
    secondaryMuscles: ["quadriceps", "hamstrings", "calves"]
  },
  {
    bodyPart: "upper legs",
    equipment: "barbell",
    gifUrl: "https://v2.exercisedb.io/image/OpemWHGhq2Ufnj",
    id: "9",
    instructions: ["Start by standing with your feet shoulder-width apart, holding a barbell across your upper back.", "Take a large step forward with your right foot, keeping your torso upright.", "Lower your body by bending your knees and hips until your right thigh is parallel to the ground.", 
    "Pause for a moment, then push through your right heel to return to the starting position."],
    name: "barbell split squat v. 2",
    target: "quads",
    secondaryMuscles: ["glutes", "hamstrings", "calves"],
  },
  {
    bodyPart: "shoulders",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/gsi2JrOpM7opeB",
    id: "2137",
    instructions: ["Sit on a bench with your feet flat on the ground and your back straight.", "Hold a dumbbell in one hand with your palm facing inwards.", "Lean forward and place your free hand on the bench for support.",
     "Keep your arm slightly bent and raise it out to the side until it is parallel to the ground.", "Pause for a moment at the top, then slowly lower your arm back down to the starting position.", "Repeat for the desired number of repetitions, then switch arms."],
    name: "dumbbell arnold press",
    target: "delts",
    secondaryMuscles: ["triceps", "upper chest"]
  }, 
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/FEtrmR-uhT870k",
    id: "0288",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell decline bench press",
    target: "pectorals",
    secondaryMuscles: ["triceps", "shoulders"]
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/LV4HBdINaWunn6",
    id: "3",
    instructions: ["Set an incline bench to a 45-degree angle and sit on it with a dumbbell in each hand, palms facing each other.", "Lie back on the bench and press the dumbbells up to the starting position, directly above your chest, with your arms extended.", "Lower the dumbbells out to the sides in a wide arc until you feel a stretch in your chest.", 
    "As you lower the dumbbells, rotate your wrists so that your palms face forward at the bottom of the movement.", "Reverse the motion and bring the dumbbells back up to the starting position, squeezing your chest muscles together at the top.", "Repeat for the desired number of repetitions."],
    name: "dumbbell incline twisted flyes",
    target: "pectorals",
    secondaryMuscles: ["shoulders", "triceps"]
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/LT5nn41xRiqLVL",
    id: "4",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "dumbbell one arm reverse grip press",
    target: "pectorals",
    secondaryMuscles: ["triceps", "shoulders"]
  },
  {
    bodyPart: "chest",
    equipment: "leverage machine",
    gifUrl: "https://v2.exercisedb.io/image/dUit9WsETwxuQI",
    id: "5",
    instructions: ["Sit on a flat bench with a dumbbell in one hand, palm facing towards your body.", "Place your feet flat on the ground and keep your back straight.", "Raise the dumbbell to shoulder height, keeping your elbow close to your body.", 
    "Press the dumbbell upwards until your arm is fully extended.", "Pause for a moment at the top, then slowly lower the dumbbell back to the starting position.", "Repeat for the desired number of repetitions, then switch to the other arm."],
    name: "lever incline chest press",
    target: "pectorals",
    secondaryMuscles: ["shoulders", "triceps"]
  },
  {
    bodyPart: "chest",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/29gQ4g6rQ4uUMf",
    id: "6",
    instructions: ["Lie on a decline bench with your feet secured and your head lower than your hips.", "Hold a dumbbell in each hand with your palms facing each other and your arms extended above your chest.", "Lower the dumbbells to the sides of your chest, keeping your elbows slightly bent.", 
    "Press the dumbbells back up to the starting position, fully extending your arms.", "Repeat for the desired number of repetitions."],
    name: "dumbbell decline hammer press",
    target: "pectorals",
    secondaryMuscles: ["triceps", "shoulders"]
  },
  {
    bodyPart: "upper arms",
    equipment: "dumbell",
    gifUrl: "https://v2.exercisedb.io/image/Jc52rMWNIQUgYS",
    id: "7",
    instructions: ["Stand with your feet shoulder-width apart and hold a dumbbell in each hand.", "Bend your knees slightly and hinge forward at the hips, keeping your back straight.", "Extend your arms straight back, squeezing your triceps at the top of the movement.", 
    "Pause for a moment, then slowly lower the dumbbells back to the starting position.", "Repeat for the desired number of repetitions."],
    name: "dumbbell standing kickback",
    target: "triceps",
    secondaryMuscles: ["shoulders"]
  },
  {
    bodyPart: "upper legs",
    equipment: "barbell",
    gifUrl: "https://v2.exercisedb.io/image/dCoteoj6RcHrVG",
    id: "8",
    instructions: ["Stand with your feet shoulder-width apart, toes slightly turned out.", "Hold the barbell across your upper back, resting it on your traps or rear delts.", "Engage your core and keep your chest up as you lower your hips back and down, as if sitting into a chair.", 
    "Lower until your thighs are parallel to the ground, or as low as you can comfortably go.", "Drive through your heels to stand back up, squeezing your glutes at the top.", "Repeat for the desired number of repetitions."],
    name: "barbell speed squat",
    target: "glutes",
    secondaryMuscles: ["quadriceps", "hamstrings", "calves"]
  },
  {
    bodyPart: "upper legs",
    equipment: "barbell",
    gifUrl: "https://v2.exercisedb.io/image/OpemWHGhq2Ufnj",
    id: "9",
    instructions: ["Start by standing with your feet shoulder-width apart, holding a barbell across your upper back.", "Take a large step forward with your right foot, keeping your torso upright.", "Lower your body by bending your knees and hips until your right thigh is parallel to the ground.", 
    "Pause for a moment, then push through your right heel to return to the starting position."],
    name: "barbell split squat v. 2",
    target: "quads",
    secondaryMuscles: ["glutes", "hamstrings", "calves"],
  }
])


  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
          // const goalsInProgress = user.personal_goals.filter((goal) => goal.completed === false);
          // const goalsCompleted = user.personal_goals.filter((goal) => goal.completed === true);
          // setPersonalGoals(goalsInProgress);
          // setCompletedGoals(goalsCompleted);

          setAllGoals(user.personal_goals);
          fetch(`/scheduledworkouts/user/${user.id}`)
          .then(r => {
            if (r.ok) {
              r.json().then((myRoutines) => {
                setMyRoutines(myRoutines)
              })
            }
          })
        
        });
      }
    });
  }, []);

 


  function onLogIn(currentUserLogin) {
    setUser(currentUserLogin);
    // const goalsInProgress = currentUserLogin.personal_goals.filter((goal) => goal.completed === false);
    // const goalsCompleted = currentUserLogin.personal_goals.filter((goal) => goal.completed === true);
    // setPersonalGoals(goalsInProgress);
    // setCompletedGoals(goalsCompleted);
    setAllGoals(currentUserLogin.personal_goals);
    fetch(`/scheduledworkouts/user/${currentUserLogin.id}`)
      .then(r => {
        if (r.ok) {
          r.json().then(myRoutines => {
            setMyRoutines(myRoutines)
          })
        }
      })

    
  }
  console.log("in app js this is myScheduledWorkouts")
  console.log(myRoutines)
  
  function updateTargetUserRoutine(id, value) {
    //USE MAP FUNCTION TO FIND TARGET ELEMENT AND ADJUST ON FRONT END STATE
    
    const updatedMyRoutines = myRoutines.map((scheduledRoutine) => {
      if (scheduledRoutine.id == id) {
        scheduledRoutine["day_of_week"] = value
        return scheduledRoutine
      } else {
        return scheduledRoutine
      }
    })

   
    setMyRoutines(updatedMyRoutines)
  }

  function addNewUserRoutine(userRoutine) {
    setMyRoutines([...myRoutines, userRoutine]);
  }

  function removeUserRoutine(userRoutineId) {
    const updatedMyRoutines = myRoutines.filter((routine) => routine.id !== userRoutineId);
    setMyRoutines(updatedMyRoutines);
  }

  function updateUserRoutine(editedRoutine, editedRoutineId) {
    const updatedMyRoutines = myRoutines.map((scheduledRoutine) => {
      if (scheduledRoutine.routine.id === editedRoutineId) {
        scheduledRoutine.routine = {...editedRoutine};
        return scheduledRoutine;
      } else {
        return scheduledRoutine;
      }
    })
    setMyRoutines(updatedMyRoutines);
  }



  function addNewGoal(newGoal) {
    setAllGoals([...allGoals, newGoal]);
  }
  function updateCompletedGoal(id) {
    console.log("hi");
    const updatedGoals = allGoals.map((goal) => {
      if (goal.id === id) {
        goal["completed"] = true;
        return goal;
      } else {
        return goal;
      }
    })

    setAllGoals(updatedGoals);
  }

  function removeDeletedGoal(id) {
    const updatedGoals = allGoals.filter((goal) => goal.id !== id);
    setAllGoals(updatedGoals);
  }

  const myWeeksRoutine = myRoutines.filter((routine) => routine["day_of_week"] !== "")
  const personalGoals = allGoals.filter((goal) => goal.completed === false);
  const completedGoals = allGoals.filter((goal) => goal.completed === true);
  
  

  useEffect(() => {
    fetch("https://exercisedb.p.rapidapi.com/exercises?limit=1200",{
      method: "GET",
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
    }})
    .then(res => res.json())
    .then(data => setWorkouts(data))
  }, [])




  return (
    <div>
      <UserContext.Provider value={user}>
        <Switch>
          <Route path="/editRoutines/:id">
            <EditRoutines workouts={workouts} user={user} updateUserRoutine={updateUserRoutine}/>
          </Route>
          <Route path="/routines">
            <Routines addNewUserRoutine={addNewUserRoutine} workouts={workouts}/>
          </Route>
          <Route path="/workouts">
            <WorkoutsList workouts={workouts} user={user} addNewUserRoutine={addNewUserRoutine}/>
          </Route>
          <Route path = "/Home/MyRoutines">
            <UserRoutines myRoutines={myRoutines} myWeeksRoutine={myWeeksRoutine} updateTargetUserRoutine={updateTargetUserRoutine} removeUserRoutine={removeUserRoutine}/>
          </Route>
          <Route path = "/Home">
            <Home myWeeksRoutine={myWeeksRoutine} updateTargetUserRoutine={updateTargetUserRoutine} workouts={workouts} personalGoals={personalGoals} completedGoals={completedGoals} updateCompletedGoal={updateCompletedGoal} removeDeletedGoal={removeDeletedGoal} addNewGoal={addNewGoal}/>
          </Route>
          <Route path = "/createAccount">
            <CreateAccount/>
          </Route>
          <Route exact path = "/">
            <Login onLogIn={onLogIn}/>
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  )
    
}

export default App;
