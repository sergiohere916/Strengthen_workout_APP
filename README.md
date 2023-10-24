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
* Name can't be empty string
* Password can’t be an empty string
* Email needs "@"
* Day of the week must be either valid day of the week or empty string
* name of a goal cannot be an empty string
* target date of a goal must be after today and must be valid date

