# Standard library imports
import os

# Remote library imports
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
#ADDED FOR BCRYPT DELETE IF NOT WORKING 10-26
from flask_bcrypt import Bcrypt

# Local imports
load_dotenv()

# Instantiate app, set attributes
app = Flask(
    __name__,
    static_folder="../client/build",
    static_url_path="",
    template_folder="../client/build",
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URI")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.secret_key = os.environ.get("SECRET_KEY")

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

#Instantiate BCRYPT ADDED FOR BCRYPT DELETE IF NOT WORKING 10-26
bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)


