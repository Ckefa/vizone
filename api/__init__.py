from flask import Blueprint


home = Blueprint("home", __name__)

from api import main