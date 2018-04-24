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
    print(data)
    print(data['adhar'])
    if act.checkUniqueness(data['adhar']):
        res = act.save_details(data)
        if res:
            print("Data got successfully saved!")
        return jsonify({'success': 'Details got successfully saved!'})
    else:
        return jsonify({'error': 'Aadhar card number already exists!'})
    


# if __name__ == "__main__":
#     app.run()
