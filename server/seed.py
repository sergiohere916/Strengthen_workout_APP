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

def create_routines():
    routines = []
    workouts = ["biceps curls", "bench press", "leg press", "preacher curls", "lat raises", "lat pulldowns", "squats", "rdls", "jumprope"]
    for i in range(5):
        routine = Routine(
            name = "Routine " + str(i),
            workouts = f'{rc(workouts)},{rc(workouts)},{rc(workouts)}',
            likes = randint(0,20),
            shared = randint(0,1)
        )
        routines.append(routine)
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
