#!/usr/bin/python
# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, redirect, Response, session
import simplejson
from flask_cors import CORS
from flask import jsonify
from .helper import Helper
from .actions import Actions as act
import base64
import csv


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
    img = {
        'image1': data['image1'].rsplit("base64,")[1],
        'image2': data['image2'].rsplit("base64,")[1],
        'image3': data['image3'].rsplit("base64,")[1]
    }
    
    if act.checkUniqueness(data['adhar']):
        res1 = act.save_details(data)
        res2  = act.convert_and_save(img, data['adhar'])
        if res1 and res2:
            print("Data got successfully saved!")
            return jsonify({'type' : 'success', 'messgae': 'Data got successfully saved!'})
        else:
            return jsonify({'type' : 'error', 'messgae': 'One of the data is not saved!'})
    else:
        print("already exists!")
        return jsonify({'type' : 'error', 'messgae': 'Aadhar card number already exists!'})
    

# if __name__ == "__main__":
#     app.run()
