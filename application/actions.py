#!/usr/bin/python
# -*- coding: utf-8 -*-

from .helper import Helper
import numpy as np
import base64
import csv
import cv2
import os
import simplejson


class Actions():

	def __init__(self):
		self.database_path = "/home/prakash/ubuntu/database/"

	# Pass the audio data to an encoding function.
	@classmethod
	def encode_audio(self, audio):
	    audio_content = audio.read()
	    return base64.b64encode(audio_content)


	@classmethod
	def save_details(self, data):
	    try:
	        header = ['firstName', 'email', 'aadharno', 'phoneno', 'address']
	        line = [data['firstName'], data['email'], data['adhar'], data['phno'], data['address']]
	        save_folder = "/home/prakash/ubuntu/database/"+  "{}/details.csv".format(data['adhar'])
	         # Create parent folders if they are not present
	        Helper.create_parent_folders_for_file(save_folder)
	        with open(save_folder,'w') as file:
	            writer = csv.writer(file)
	            writer.writerow(header)
	            writer.writerow(line)
	        return True
	    except Exception as e:
	        # (e)
	        return False

	@classmethod
	def checkUniqueness(self, aadharNo):
		try:
			res = False
			fileName = "/home/prakash/ubuntu/database/" + "uniqueIds.csv"
			with open(fileName, 'r') as csv_file:
				reader = csv.reader(csv_file)
				uniqueIds = []
				for row in reader:
					if len(row):
						uniqueIds.append(str(row[0]))
				# (uniqueIds)
			csv_file.close()
			with open(fileName, 'a') as csv_file:
				lst = [str(aadharNo)]
				# (lst)
				if str(aadharNo) not in uniqueIds:
					writer = csv.writer(csv_file)
					writer.writerow(lst)
					res = True
				csv_file.close()
			return res
		except Exception as e:
			# (e)
			return False
	
	@classmethod
	def save(self, b64_string, path):
		with open(path, "wb") as fh:
			fh.write(base64.decodebytes(b64_string.encode()))	

	@classmethod
	def redifend_wav_file(self, fname, fpath, inp_file):
		out_file = os.path.join(fpath, '%s.wav'%fname) 
		cmd = "ffmpeg -y -i  %s -q:a 0  %s"%(inp_file, out_file)
		os.system(cmd)
		return 

	@classmethod
	def convert_and_save(self, img, folderName):
		path = "/home/prakash/ubuntu/database/{}/".format(folderName)
		try:
			for k,v in img.items():
				Actions.save(img[k], path + k + ".png")
			return True
		except Exception as e:
			# (e)
			return False


	@classmethod
	def saveAudioClip(self, audio, folderName):
		path = "/home/prakash/ubuntu/database/{}".format(folderName)
		fpath = path + "/" + folderName + ".webm"
		try:
			Actions.save(audio, path + "/" + folderName + ".webm")
			Actions.redifend_wav_file(folderName, path, fpath)
			return True
		except Exception as e:
			# (e)
			return False

	@classmethod
	def data_uri_to_cv2_img(self, uri):
	    encoded_data = uri.split(',')[1]
	    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
	    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
	    return img

	@classmethod
	def getUserData(self, folderName):
		path = "/home/prakash/ubuntu/database/{}/details.csv".format(folderName)
		try:
			header = []
			with open(path, 'r') as csv_file:
				reader = csv.reader(csv_file)
				header = next(reader)
				reader = next(reader)
			# (header)
			# (reader)
			csv_file.close()
			data = {
				"Name": reader[0],
				"Email ID": reader[1],
				"Aadhar Card Number": reader[2],
				"Address": reader[4],
				"Phone Number": reader[3]
			}
			return simplejson.dumps(data,indent=4, sort_keys=False)
		except Exception as e:
			# (e)
			return False
