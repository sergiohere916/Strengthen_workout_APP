
https://github.com/sergiohere916/Strengthen_workout_APP/assets/137942550/bedc566f-e88c-43b1-bc66-3df1284c525d
# Strengthen_Workout_APP

## One sentence description:
Check out a wide variety of excercises and create workout routines for yourself to use. 

## CRUD Deliverables
* C- users can create an account, can create scheduled workouts, can create routines, and create personal goals
* R- users can view all their account details, scheduled workouts, personal goals, routines, and excercises
* U- users can update their account, and scheduled workouts (update the assigned day of the week for a workout and update the number of times workout has been completed)
* D- users can delete their accounts, scheduled workouts, and personal goals

# Data models:
![Screenshot 2023-10-24 133719](https://github.com/sergiohere916/Strengthen_workout_APP/assets/137942550/0d906bf2-da4d-4a87-a235-3d491ce8388a)

## Relationships:
* A user has many scheduled workouts 
* A routine has many users
* A scheduled workout will belong to a user and will belong to a routine
* A user has many personal goals
* A personal goal belongs to a user

## Validations:
* Name in username can't be empty string
* Password can’t be an empty string
* Email needs "@"
* Day of the week must be either valid day of the week or empty string
* name of a goal cannot be an empty string
* name of goal cannot exceed 75 characters
* target date of a goal must be after today and must be valid date

# Wireframe:
![Screenshot 2023-10-24 163725](https://github.com/sergiohere916/Strengthen_workout_APP/assets/137942550/1a3faf82-cd4e-467f-856a-5207a5d47086)

# APP Preview:
https://github.com/sergiohere916/Strengthen_workout_APP/assets/137942550/a0720537-5099-450e-a516-97efea1ba86c

# API Routes:
* GET/users/<int:id>
* GET/routines
* GET/scheduled_workouts
* GET/personal_goals

* POST/users
* POST/routines
* POST/scheduled_workouts
* POST/personal_goals

* PATCH/users/<int:id>
* PATCH/routines/<int:id>
* PATCH/scheduled_workouts/<int:id>
* PATCH/personal_goals/<int:id>

* DELETE/users/<int:id>
* DELETE/scheduled_workouts
* DELETE/personal_goals

# Frontend Component Routing:
Login 
* Post/login
* 
Create_Account
* Post/users
  
NavBar
* /Home
* /Excerises
* /Routines  

Home
* GET/routines
* GET/scheduled_workouts
* GET/personal_goals
* POST/personal_goals
  
All_Personal_Workouts
* PATCH/scheduled_workouts<int:id>
* DELETE/scheduled_workouts<int:id>

Personal_Goals
* DELETE/personal_goals<int:id>
* PATCH/personal_goals<int:id>

Personal_Goal_FORM
* POST/personal_goals<int:id>

Routines
* Post/scheduled_workouts
* PATCH/routines<int:id>

Create_Routines_Form
* POST/routines
* POST/scheduled_workouts

Account
* PATCH/user/<int:id>
* DELETE/user/<int:id>

# Serialize Rules:
* ("-scheduled_workouts.user",)
* (“-scheduled_workouts.routine”,)
* ("-user.scheduled_workouts", "routine.scheduled_workouts")

# Stretch Goals:
*  Have button feature that sends user a motivational video when requested
*  Have videos of workouts available for display in addition to animations
*  Allow for editing of routines
*  ALlow user to add in sets and reps to their saved workouts








