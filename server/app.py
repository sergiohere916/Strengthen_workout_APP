#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Routine, PersonalGoal, ScheduledWorkout

#imported this manually 10-25-2023
from datetime import date,datetime

# Views go here!
class Login(Resource):

    def post(self):

        email = request.json['email']
        user = User.query.filter(User.email == email).first()
        password = request.json['password']
        #CODE REQUIRED FOR HASHING REVISIT LATER
        if user.authenticate(password):
            print("you're in!!")
            session['user_id'] = user.id
            return user.to_dict(), 200
        # if password == user.password:
            # session['user_id'] = user.id
            # print("session would be created")
            # return user.to_dict(), 200


        return {'error': 'Invalid username or password'}, 401
api.add_resource(Login, "/login")

class Logout(Resource):

    def delete(self): # just add this line!
        session['user_id'] = None
        return {'message': '204: No Content'}, 204

api.add_resource(Logout, '/logout')

class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401

api.add_resource(CheckSession, '/check_session')


class Users(Resource):
    def get(self):
        users = [user.to_dict(rules=('-personal_goals', '-scheduled_workouts',)) for user in User.query.all()]
        return make_response(users, 200)
    def post(self):
        data = request.json
        try:
            new_user = User(
                name = data["name"],
                email = data["email"],
                account_created = datetime.now().date(),
                password_hash = data["password"]
            )

            db.session.add(new_user)
            db.session.commit()

            return make_response(new_user.to_dict(rules=('-personal_goals', '-scheduled_workouts',)), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
api.add_resource(Users, '/users')

class UsersByID(Resource):
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.json
        if user:
            try:
                for attr in data:
                    setattr(user, attr, data[attr])

                db.session.add(user)
                db.session.commit()
                
                return make_response(user.to_dict(), 202)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "User not found"}, 404)
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()

            return make_response({"message": "User was successfully deleted"}, 204)
        else:
            return make_response({"error": "User not found"}, 404)

api.add_resource(UsersByID, '/users/<int:id>')

class Routines(Resource):
    def get(self):
        routines = [routine.to_dict() for routine in Routine.query.all()]
        return make_response(routines, 200)
    def post(self):
        try:
            data = request.json
            new_routine = Routine(
                name = data["name"],
                workouts = data["workouts"],
                sets_n_reps = data["sets_n_reps"],
                likes = data["likes"],
                shared = data["shared"]
            )

            db.session.add(new_routine)
            db.session.commit()

            return make_response(new_routine.to_dict(), 201)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
api.add_resource(Routines, '/routines')

class RoutinesByID(Resource):
    def get(self,id):
        routine = Routine.query.filter_by(id=id).first()
        if routine:
            return make_response(routine.to_dict(rules=("-scheduled_workouts",)), 200)
        else:
            return make_response({"error": "Routine not found"}, 404)
    def patch(self, id):
        data = request.json
        routine = Routine.query.filter_by(id=id).first()
        if routine:
            try:
                for attr in data:
                    setattr(routine, attr, data[attr])

                db.session.add(routine)
                db.session.commit()

                return make_response(routine.to_dict(), 202)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "Routine not found"}, 404)
api.add_resource(RoutinesByID, '/routines/<int:id>')

class PersonalGoals(Resource):
    def get(self):
        personal_goals = [personal_goal.to_dict(rules=('-user',)) for personal_goal in PersonalGoal.query.all()]
        return make_response(personal_goals, 200)
    def post(self):
        data = request.json
        ##EXPECTING STRING DATE YYYY-12-01
        #MAY NEED TO ADJUST DATE BEING BROUGHT IN BY DATA
        target_date = data["target_date"].split("-")
        adjusted_target_date = date(int(target_date[0]), int(target_date[1]), int(target_date[2]))
        try:
            new_personal_goal = PersonalGoal(
                name = data["name"],
                target_date = adjusted_target_date,
                completed = 0,
                user_id = data["user_id"]
            )

            db.session.add(new_personal_goal)
            db.session.commit()

            return make_response(new_personal_goal.to_dict(rules=('-user',)), 202)
        except:
            return make_response({"errors": ["validation errors"]}, 400)
api.add_resource(PersonalGoals, '/personalgoals')

class PersonalGoalsByID(Resource):
    def get(self,id):
        personal_goal = PersonalGoal.query.filter_by(id=id).first()
        if personal_goal:
            return make_response(personal_goal.to_dict(), 200)
        else:
            return make_response({"error": "Personal Goal not found"})
    def patch(self, id):
        personal_goal = PersonalGoal.query.filter_by(id=id).first()
        data = request.json
        # if data["target_date"]:
        #     target_date = data["target_date"].split("-")
        #     fixed_date = date(int(target_date[0]), int(target_date[1]), int(target_date[2]))
        if personal_goal:
            try: 
                for attr in data:
                    if attr == "target_date":
                        target_date = data["target_date"].split("-")
                        fixed_date = date(int(target_date[0]), int(target_date[1]), int(target_date[2]))
                        setattr(personal_goal, attr, fixed_date)
                    else:
                        setattr(personal_goal, attr, data[attr])
                
                db.session.add(personal_goal)
                db.session.commit()

                return make_response(personal_goal.to_dict(), 202)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "Personal Goal not found"}, 404)
    def delete(self,id):
        personal_goal = PersonalGoal.query.filter_by(id=id).first()
        if personal_goal:
            db.session.delete(personal_goal)
            db.session.commit()

            return make_response({"message": "Personal Goal successfully deleted"}, 204)
        else:
            return make_response({"error": "Personal Goal not found"}, 404)
api.add_resource(PersonalGoalsByID, '/personalgoals/<int:id>')

class PersonalGoalsByUserID(Resource):
    def get(self, id):
        personal_goals = [goal.to_dict(rules=('-user',)) for goal in PersonalGoal.query.filter_by(user_id = id).all()]
        if personal_goals:
            return make_response(personal_goals, 200)
        else: 
            return make_response({"error": "Goal was not found"}, 404)
api.add_resource(PersonalGoalsByUserID, '/personalgoals/user/<int:id>')


class ScheduledWorkouts(Resource):
    def get(self):
        scheduled_workouts = [workout.to_dict(rules=('-routine', '-user',)) for workout in ScheduledWorkout.query.all()]
        return make_response(scheduled_workouts, 200)
    def post(self):
        data = request.json
        try:
            new_scheduled_workout = ScheduledWorkout(
                day_of_week = data["day_of_week"],
                times_completed = 0,
                user_id = data["user_id"],
                routine_id = data["routine_id"]
            )

            db.session.add(new_scheduled_workout)
            db.session.commit()

            return make_response(new_scheduled_workout.to_dict(rules=('-routine_id', '-user',)), 202)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)
api.add_resource(ScheduledWorkouts, '/scheduledworkouts')

class ScheduledWorkoutsByID(Resource):
    def get(self,id):
        scheduled_workout = ScheduledWorkout.query.filter_by(id=id).first()
        if scheduled_workout:
            return make_response(scheduled_workout.to_dict(rules=('-user',)), 200)
        else:
            return make_response({"error": "Workout not found"}, 404)
    def patch(self,id):
        scheduled_workout = ScheduledWorkout.query.filter_by(id=id).first()
        data = request.json
        if scheduled_workout:
            try:
                for attr in data:
                    setattr(scheduled_workout, attr, data[attr])
                
                db.session.add(scheduled_workout)
                db.session.commit()

                return make_response(scheduled_workout.to_dict(rules=('-user',)), 202)
            except ValueError:
                return make_response({"errors": ["validation errors"]}, 400)
        else:
            return make_response({"error": "Workout not found"}, 404)
    def delete(self,id):
        scheduled_workout = ScheduledWorkout.query.filter_by(id=id).first()
        if scheduled_workout:
            db.session.delete(scheduled_workout)
            db.session.commit()

            return make_response({"message": "Workout successfully deleted"}, 204)
        else:
            return make_response({"error": "Workout not found"}, 404)
api.add_resource(ScheduledWorkoutsByID, '/scheduledworkouts/<int:id>')

class ScheduledWorkoutsByUserID(Resource):
    def get(self, id):
        scheduled_workouts = [workout.to_dict(rules=('-user', '-routine_id',)) for workout in ScheduledWorkout.query.filter_by(user_id = id).all()]
        if scheduled_workouts:
            return make_response(scheduled_workouts, 200)
        else: 
            return make_response({"error": "User was not found"}, 404)
api.add_resource(ScheduledWorkoutsByUserID, '/scheduledworkouts/user/<int:id>')


@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

