#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, Response, session
import simplejson
from flask_cors import CORS
from .models import *
import base64


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")


def convert_and_save(b64_string, path):
    with open(path, "wb") as fh:
        fh.write(base64.decodebytes(b64_string.encode()))


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
    # image = request.files['image']  
    # image_string = base64.b64encode(image.read())
    data = request.get_json()
    img_data = data['img']
    path = "tmp/images/imageToSave.png"
    try:
        convert_and_save(img_data, path)
        if checkImage(path):
            return simplejson.dumps({"next": "left"},indent=4)
        else:
            return jsonify({'error': 'Not valid'})
    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route("/getLeftImage", methods=["POST"])
def getLeftImage():
    data = request.get_json()
    img_data = data['img']
    path = "tmp/images/imageToSave.png"
    try:
        convert_and_save(img_data, path)
        if checkImage(path):
            return simplejson.dumps({"next": "right"},indent=4)
        else:
            return jsonify({'error': 'Not valid'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route("/getRightImage", methods=["POST"])
def getRightImage():
    data = request.get_json()
    img_data = data['img']
    path = "tmp/images/imageToSave.png"
    try:
        convert_and_save(img_data, path)
        if checkImage(path):
            return simplejson.dumps({"next": "voice"},indent=4)
        else:
            return jsonify({'error': 'Not valid'})
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route("/getFinalImages", methods=["GET","POST"])
def getFinalImages():
    path = "tmp/images/"
    images = {
        "front": path + "front.png",
        "left": path + "left.png",
        "right": path + "right.png"
    }
    return simplejson.dumps(images,indent=4)


@app.route("/getVoiceClip", methods=["POST"])
def getVoiceClip():
    return redirect("/")