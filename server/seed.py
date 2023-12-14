#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
from datetime import *

# Local imports
from app import app
from models import db, User, Routine, PersonalGoal, ScheduledWorkout

def create_users():
    users = []
    for _ in range(5):
        user = User(
            name = fake.name(),
            email = fake.email(),
            account_created = fake.date_between(date(2023, 1, 1), date(2023, 10, 1)),
            password_hash = "password1",
        )
        users.append(user)
    return users

#return point 2

#3/4 sit-up,alternate heel touchers,air bike,barbell sitted alternate leg raise,bottoms-up
#3x30,3x15,3x20,3x15,3x10

#cable pushdown (with rope attachment),cable overhead triceps extension (rope attachment),cable pushdown,cable standing one arm triceps extension,bench dip on floor
#4x10,3x10,3x10,3x8,3x10

#
#

#burpee,mountain climber,jump rope,run (equipment)
#5x10,3x30,5x50,1x1
def create_routines():
    
    
    routine1 = Routine(
        name = "Routine01",
        workouts = "barbell bench press,barbell incline bench press,barbell decline bench press,cable low fly,cable middle fly,lever chest press,dumbbell biceps curl,dumbbell incline biceps curl,barbell preacher curl",
        sets_n_reps = "4x8,4x8,3x10,3x10,3x10,3x10,4x8,2x8,2x10",
        likes = randint(200,500),
        shared = 1
    )
    routine2 = Routine(
        name = "Routine02",
        workouts = "barbell upright row,barbell wide-grip upright row,band standing rear delt row,dumbbell rear lateral raise,dumbbell lying rear delt row,dumbbell lateral raise,cable one arm lateral raise,dumbbell seated shoulder press,lever shoulder press v. 3",
        sets_n_reps = "2x10,2x8,4x10,3x8,3x8,3x8,2x8,4x8,3x10",
        likes = randint(50,500),
        shared = 1
    )
    routine3 = Routine(
        name = "Routine03",
        workouts = "cable pulldown,cable underhand pulldown,cable lateral pulldown with v-bar,lever alternating narrow grip seated row,cable straight back seated row,cable seated wide-grip row,lever alternating narrow grip seated row,lever high row,dumbbell shrug",
        sets_n_reps = "4x8,3x8,3x8,3x10,4x10,4x8,3x10,4x10,4x8,3x10",
        likes = randint(50,500),
        shared = 1
    )
    routine4 = Routine(
        name = "Routine04",
        workouts = "lever leg extension,barbell full squat,barbell romanian deadlift,barbell deadlift,lever lying leg curl,dumbbell single leg split squat,lever seated calf raise",
        sets_n_reps = "5x10,5x10,2x10,3x10,3x10,3x10,3x10",
        likes = randint(50,500),
        shared = 1
    )
    routine5 = Routine(
        name = "Routine05",
        workouts = "cable pushdown (with rope attachment),cable overhead triceps extension (rope attachment),cable pushdown,cable standing one arm triceps extension,bench dip on floor",
        sets_n_reps = "4x10,3x10,3x10,3x8,3x10",
        likes = randint(50,500),
        shared = 1
    )
    routine6 = Routine(
        name = "Routine06",
        workouts = "burpee,mountain climber,jump rope,run (equipment)",
        sets_n_reps = "5x10,3x30,5x50,1x1",
        likes = randint(50,500),
        shared = 1
    )
    routine7 = Routine(
        name = "Routine07",
        workouts = "3/4 sit-up,alternate heel touchers,air bike,barbell sitted alternate leg raise,bottoms-up",
        sets_n_reps = "3x30,3x15,3x20,3x15,3x10",
        likes = randint(50,500),
        shared = 1
    )
    routine8 = Routine(
        name = "Routine08",
        workouts = "barbell speed squat,barbell split squat v. 2",
        sets_n_reps = "3x10,3x10",
        likes = randint(0,20),
        shared = 1
    )
    routine9 = Routine(
        name = "Routine09",
        workouts = "barbell speed squat,barbell split squat v. 2",
        sets_n_reps = "3x10,3x10",
        likes = randint(0,20),
        shared = 1
    )
    routines = [routine1, routine2, routine3, routine4, routine5, routine6, routine7, routine8, routine9]
    return routines




def create_personal_goals(users):
    personal_goals = []
    for _ in range(5):
        goal = PersonalGoal(
            name = fake.sentence(),
            target_date = fake.date_between(date(2023, 10, 1), date(2023, 10, 20)),
            completed = 0,
            user_id = rc(users).id
        )
        personal_goals.append(goal)
    return personal_goals

# def create_scheduled_workout(users, routines):
#     workouts = []
#     for _ in range(7):
        
#         workout = ScheduledWorkout(
#             day_of_week = ()
#         )

def give_user1_workout(users, routines):
    user = users[0]
    workout = ScheduledWorkout(
        day_of_week = "Monday",
        times_completed = 0,
        user_id = user.id,
        routine_id = rc(routines).id
    )
    return workout

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("clearing db")
        User.query.delete()
        Routine.query.delete()
        PersonalGoal.query.delete()
        ScheduledWorkout.query.delete()
        db.session.commit()

        print("seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("seeding routines...")
        routines = create_routines()
        db.session.add_all(routines)
        db.session.commit()

        print("seeding personal goals...")
        goals = create_personal_goals(users)
        db.session.add_all(goals)
        db.session.commit()
        
        print("seeding scheduled workouts...")
        workout = give_user1_workout(users, routines)
        db.session.add(workout)
        db.session.commit()

        # user = User(name = "Sergio H", email = "sergio@gmail.com", account_created = datetime.now().date(), password = "password1")
        # db.session.add(user)
        # db.session.commit()
