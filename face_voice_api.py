#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, Response
import simplejson
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/getFrontImage", methods=["POST"])
def getFrontImage():
	return redirect("/")


@app.route("/getLeftImage", methods=["POST"])
def getLeftImage():
	return redirect("/")


@app.route("/getRightImage", methods=["POST"])
def getRightImage():
	return redirect("/")


if __name__ == "__main__":
    app.run()