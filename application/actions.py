#!/usr/bin/python
# -*- coding: utf-8 -*-

from .helper import Helper
import base64
import csv

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
	        header = ['firstName', 'lastName', 'email', 'aadharno', 'phoneno', 'address']
	        line = [data['firstName'], data['lastName'], data['email'], data['adhar'], data['phno'], data['address']]
	        save_folder = "/home/prakash/ubuntu/database/"+  "{}/details.csv".format(data['adhar'])
	         # Create parent folders if they are not present
	        Helper.create_parent_folders_for_file(save_folder)
	        with open(save_folder,'w') as file:
	            writer = csv.writer(file)
	            writer.writerow(header)
	            writer.writerow(line)
	        return True
	    except Exception as e:
	        print(e)
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
					print(row)
					uniqueIds.append(str(row))
				print(uniqueIds)
			csv_file.close()
			with open(fileName, 'a') as csv_file:
				lst = [str(aadharNo)]
				print(lst)
				if str(aadharNo) not in uniqueIds:
					writer = csv.writer(csv_file)
					writer.writerow(lst)
					res = True
				csv_file.close()
			return res
		except Exception as e:
			print(e)
			return False
	
