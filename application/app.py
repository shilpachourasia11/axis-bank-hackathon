#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, Response, session
import simplejson
from flask_cors import CORS
from .models import *


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    email=incoming["email"]
    password=incoming["password"]
    # if not session.get("logged_in"):
    #     insert_user(email, password)
    return render_template("index.html",email=email)
        

@app.route("/getFrontImage", methods=["POST"])
def getFrontImage():
    return redirect("/")


@app.route("/getLeftImage", methods=["POST"])
def getLeftImage():
    return redirect("/")


@app.route("/getRightImage", methods=["POST"])
def getRightImage():
    return redirect("/")


# if __name__ == "__main__":
#     app.run()