#!/usr/bin/python
# -*- coding: utf-8 -*-

import csv
import cv2
import simplejson
import base64
import os


from flask import Flask, render_template, request, redirect, Response, session
from flask_cors import CORS
from flask import jsonify

from .helper import Helper
from .OpenCVFaceRecognitionPython import main
from .VoiceRecognition import Speaker_Recognization_Train
from .actions import Actions




app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
CORS(app)
BASE_DIR = os.path.dirname(os.path.realpath(__file__))
database_path = os.path.dirname(os.path.realpath(__file__))+"/database"
act = Actions()
obj = Speaker_Recognization_Train(BASE_DIR)


@app.route("/")
def index():
    return render_template("index.html")
        

@app.route("/saveData", methods=["POST"])
def saveData():
    data = request.get_json()
    # print(data)
    img = {}
    audioClip = {}
    for k,v in data.items():
        if 'image' in k:
            img.update({k:data[k].rsplit("base64,")[1]})
        if 'audio' in k:
            audioClip.update({k:data[k].rsplit("base64")[1]})

    if act.checkUniqueness(data['adhar'],database_path):
        res1 = act.save_details(data,database_path)
        res2 = act.convert_and_save(img, data['adhar'],database_path)
        res3 = act.saveAudioClip(audioClip, data['adhar'],database_path)
        # obj.train()
        if res1 and res2 and res3:
            print("Data got successfully saved!")
            return jsonify({'type' : 'success', 'message': 'Data got successfully saved!'})
        else:
            return jsonify({'type' : 'error', 'message': 'Missing information!'})
    else:
        # ("already exists!")
        return jsonify({'type' : 'error', 'message': 'Aadhar card number already exists!'})
    

@app.route("/verify_user", methods=["POST"])
def verify_user():
    data = request.get_json()
    try:
        print ("REMOVE ALL TEST FILES...")
        os.system("rm -rf "+BASE_DIR+"/database/test_data/*")
        img1 = act.data_uri_to_cv2_img(data['image1'])
        img2 = act.data_uri_to_cv2_img(data['image2'])
        audio = data['audioClip1'].rsplit("base64,")[1]
        audio_file = BASE_DIR+"/database/test_data/test.webm"
        act.save(audio, audio_file)
        act.redifend_wav_file("test", BASE_DIR+"/database/test_data", audio_file)
        print ("CALLING IMAGE....")
        dir_user = main(img1,BASE_DIR)
        audio_file =  BASE_DIR+"/database/test_data/test.wav"
        print ("CALLING VOICE....")
        res = obj.test(audio_file)
        if dir_user==res:
            # ("USER:",dir_user)
            res = act.getUserData(dir_user,database_path)
            # (res)
            return jsonify({'type' : 'success', 'message': res})
        else:
            return jsonify({'type' : 'error', 'message': "Can't identify you!"})
    except Exception as e:
        print ("EXCEPTION:",e)
        return jsonify({'type' : 'error', 'message': "Can't identify you!"})
