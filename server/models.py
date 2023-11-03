from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

#ADDED FOR BCRYPT DELETE IF NOT WORKING 10-26
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique = True)
    account_created = db.Column(db.Date)
    _password_hash = db.Column(db.String)

    #Relationships
    personal_goals = db.relationship('PersonalGoal', backref='user', cascade='all, delete')
    scheduled_workouts = db.relationship('ScheduledWorkout', backref='user', cascade='all, delete')
    #Serialize_Rules
    serialize_rules = ('-scheduled_workouts.user',)
    serialize_rules = ('-personal_goals.user',)
    def __repr__(self):
        return f'<User: {self.name}, id: {self.id}>'
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    @validates('name')
    def validate_name(self, key, name):
        if name and len(name) >= 2:
            return name
        else:
            raise ValueError("Must insert name with at least 2 characters")
    @validates('email')
    def validate_email(self, key, email):
        if email and '@' in email:
            return email
        else:
            raise ValueError("Must include a valid email -- @")
    

class Routine(db.Model, SerializerMixin):
    __tablename__ = 'routines'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    workouts = db.Column(db.String)
    likes = db.Column(db.Integer)
    shared = db.Column(db.Boolean)

    #Relationships
    scheduled_workouts = db.relationship('ScheduledWorkout', backref='routine', cascade='all, delete')
    #Serialize_Rules
    serialize_rules = ('-scheduled_workouts.routine',)


    def __repr__(self):
        return f'<Routine: {self.name}, id: {self.id}, sharable: {self.shared} >'
    
    @validates('name')
    def validate_name(self, key, name):
        if name and len(name) >= 1:
            return name
        else:
            raise ValueError("Routines must have a name")
    
    # @validates('workouts')
    # def validate_workouts(self, key, workouts):
    #     if workouts and len(workouts) >=1:
    #         return workouts
    #     else:
    #         raise ValueError("A routine must have at least one workout")

class PersonalGoal(db.Model, SerializerMixin):
    __tablename__ = 'personal_goals'
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    target_date = db.Column(db.Date)
    completed = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    #MAY NEED SERIALIZE RULES?
    serialize_rules = ('-user.personal_goals',)

    def __repr__(self):
        return f'<Personal Goal: {self.name}, id: {self.id}, owner: {self.user_id} >'
    
    @validates('name')
    def validate_name(self, key, name):
        if name and len(name) >=1:
            return name
        else:
            raise ValueError("Personal goal cannot be blank must include at least one character")
    @validates('target_date')
    def validate_date(self, key, date):
        if date:
            return date
        else:
            raise ValueError("Must include a target date for a personal goal")
        

class ScheduledWorkout(db.Model, SerializerMixin):
    __tablename__ = 'scheduled_workouts'

    id = db.Column(db.Integer, primary_key = True)
    day_of_week = db.Column(db.String)
    times_completed = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    routine_id = db.Column(db.Integer, db.ForeignKey('routines.id'))

    serialize_rules = ('-user.scheduled_workouts', '-routine.scheduled_workouts',)

    def __repr__(self):
        return f'<Personal Scheduled Workout: {self.id}, owner: {self.user_id} routine pulled from: {self.routine_id} >'

    # @validates('day_of_week')
    # def validate_day_of_week(self, key, day):
    #     if day and day in ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]:
    #         return day
    #     else:
    #         raise ValueError("Day of week must either be unnassigned or a valid day of the week")