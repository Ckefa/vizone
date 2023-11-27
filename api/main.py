from api import home
from api.hunter import generate_data
from flask import render_template

@home.route('/', strict_slashes=False)
def homepage():
    return render_template("index.html")

@home.route("/videos", strict_slashes=False)
def get_videos():
    data = generate_data()
    return {"data": data}


