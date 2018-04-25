#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, Response, session
import simplejson
from flask_cors import CORS
from flask import jsonify
from .helper import Helper
from .OpenCVFaceRecognitionPython import main
from .Train_Model import Speaker_Recognization_Train 
from .actions import Actions as act
import base64
import csv
import cv2
obj = Speaker_Recognization_Train()


app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)



@app.route("/")
def index():
    return render_template("index.html")
        

@app.route("/saveData", methods=["POST"])
def saveData():
    data = request.get_json()
    # s# (data)
    # (data['adhar'])
    img = {}
    for k,v in data.items():
        if 'image' in k:
            img.update({k:data[k].rsplit("base64,")[1]})

    audioClip = data['audioClip'].rsplit("base64,")[1]
    if act.checkUniqueness(data['adhar']):
        res1 = act.save_details(data)
        res2 = act.convert_and_save(img, data['adhar'])
        res3 = act.saveAudioClip(audioClip, data['adhar'])
        obj.train()
        if res1 and res2 and res3:
            # ("Data got successfully saved!")
            return jsonify({'type' : 'success', 'message': 'Data got successfully saved!'})
        else:
            return jsonify({'type' : 'error', 'message': 'Missing information!'})
    else:
        # ("already exists!")
        return jsonify({'type' : 'error', 'message': 'Aadhar card number already exists!'})
    

@app.route("/verify_user", methods=["POST"])
def verify_user():
    data = request.get_json()
    # # (data)
    try:
        img = act.data_uri_to_cv2_img(data['image1'])
        audio = data['audioClip'].rsplit("base64,")[1]
        audio_file = "/home/prakash/ubuntu/test.webm"
        act.save(audio, audio_file)
        act.redifend_wav_file("test", "/home/prakash/ubuntu", audio_file)
        dir_user = main(img)
        audio_file = "/home/prakash/ubuntu/test.wav"
        res = obj.test(audio_file)
        if dir_user == res:
            # ("USER:",dir_user)
            res = act.getUserData(dir_user)
            # (res)
            return jsonify({'type' : 'success', 'message': res})
        else:
            return jsonify({'type' : 'error', 'message': "Can't identify you!"})
    except Exception as e:
        return jsonify({'type' : 'error', 'message': "Can't identify you!"})
