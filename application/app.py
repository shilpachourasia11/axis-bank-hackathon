#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, Response, session
import simplejson
from flask_cors import CORS
from flask import jsonify
from .helper import Helper
from .OpenCVFaceRecognitionPython import main
from .actions import Actions as act
import base64
import csv
import cv2


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)



@app.route("/")
def index():
    return render_template("index.html")
        

@app.route("/saveData", methods=["POST"])
def saveData():
    data = request.get_json()
    # sprint(data)
    print(data['adhar'])
    img = {}
    for k,v in data.items():
        if 'image' in k:
            img.update({k:data[k].rsplit("base64,")[1]})

    audioClip = data['audioClip'].rsplit("base64,")[1]
    if act.checkUniqueness(data['adhar']):
        res1 = act.save_details(data)
        res2  = act.convert_and_save(img, data['adhar'])
        res3 = act.saveAudioClip(audioClip, data['adhar'])
        if res1 and res2 and res3:
            print("Data got successfully saved!")
            return jsonify({'type' : 'success', 'messgae': 'Data got successfully saved!'})
        else:
            return jsonify({'type' : 'error', 'messgae': 'One of the data is not saved!'})
    else:
        print("already exists!")
        return jsonify({'type' : 'error', 'messgae': 'Aadhar card number already exists!'})
    

@app.route("/verify_user", methods=["POST"])
def verify_user():
    data = request.get_json()
    # print(data)
    try:
        img = act.data_uri_to_cv2_img(data['image1'])
        dir_user = main(img)
        if dir_user != 1:
            res = act.getUserData(dir_user)
            print(res)
            return jsonify({'type' : 'success', 'messgae': res})
        else:
            return jsonify({'type' : 'error', 'messgae': "User doesn't exist!"})
    except Exception as e:
        print(e)
        return jsonify({'type' : 'error', 'messgae': "User doesn't exist!"})


