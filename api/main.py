from api import home
from flask import request
from api.hunter import generate_data
from flask import render_template

@home.route('/', strict_slashes=False)
def homepage():
    return render_template("index.html")

@home.route("/videos", strict_slashes=False)
def get_videos():
    data = generate_data()
    start = request.args.get('start')
    end = request.args.get('end')
    
    if start and end:
        start, end = map(int, [start, end])
        data = data[start:end]
        print(start, end)    
    return {"data": data}


