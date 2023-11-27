#!/usr/bin/env python3
from api import home
from flask import Flask, render_template
from flask_cors import CORS


app = Flask(__name__, template_folder="./front_end/dist", static_folder="./front_end/dist/assets")
app.register_blueprint(home)
CORS(app)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)