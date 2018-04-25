
# coding: utf-8

# Face Recognition with OpenCV

#import OpenCV module
import cv2
#import os module for reading training data directories and paths
import os
import re
import time
#import numpy to convert python lists to numpy arrays as
#it is needed by OpenCV face recognizers
import numpy as np

#there is no label 0 in our training data so subject name for index/label 0 is empty

#function to detect face using OpenCV
def detect_face(img):
    #convert the test image to gray image as opencv face detector expects gray images
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    #load OpenCV face detector, I am using LBP which is fast
    #there is also a more accurate but slow Haar classifier
    cv_casccade_file = os.path.dirname(os.path.realpath(__file__)) + '/opencv-files/lbpcascade_frontalface.xml'
    face_cascade = cv2.CascadeClassifier(cv_casccade_file)
    # face_cascade = cv2.CascadeClassifier('/home/prakash/Desktop/new/axis-bank-hackathon/application/opencv-files/lbpcascade_frontalface.xml')

    #let's detect multiscale (some images may be closer to camera than others) images
    #result is a list of faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5);
    
    #if no faces are detected then return original img
    if (len(faces) == 0):
        return None, None
    
    #under the assumption that there will be only one face,
    #extract the face area
    (x, y, w, h) = faces[0]
    
    #return only the face part of the image
    return gray[y:y+w, x:x+h], faces[0]


def prepare_training_data(data_folder_path):
    
    #------STEP-1--------
    #get the directories (one directory for each subject) in data folder
    dirs = os.listdir(data_folder_path)
    print(dirs)
    dirs.remove('uniqueIds.csv')
    print(dirs)
    #list to hold all subject faces
    faces = []
    labels = []


    #let's go through each directory and read images within it
    for dir_name in dirs:
        print(dir_name)
        subject_dir_path = data_folder_path + "/" + dir_name
        #get the images names that are inside the given subject directory
        subject_images_names = os.listdir(subject_dir_path)
        #------STEP-3--------
        #go through each image name, read image, 
        #detect face and add face to list of faces
        for image_name in subject_images_names:
            
            #ignore system files like .DS_Store
            # if image_name.startswith("."):
            #     continue;
            if not re.search(r'.jpg|.png$', image_name):
               continue;
            #build image path
            #sample image path = training-data/s1/1.pgm
            image_path = subject_dir_path + "/" + image_name
            print(image_path)
            #read image
            image = cv2.imread(image_path)
            #detect face
            face, rect = detect_face(image)
            #------STEP-4--------
            #for the purpose of this tutorial
            #we will ignore faces that are not detected
            if face is not None:
                #add face to list of faces
                faces.append(face)
                #add label for this face
                labels.append(dir_name)

    return faces, labels


def draw_rectangle(img, rect):
    (x, y, w, h) = rect
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)


# function to draw text on give image starting from
# passed (x, y) coordinates.
def draw_text(img, text, x, y):
    cv2.putText(img, text, (x, y), cv2.FONT_HERSHEY_PLAIN, 1.5, (0, 255, 0), 2)


# this function recognizes the person in image passed
# and draws a rectangle around detected face with name of the
# subject
def predict(test_img, label_dict,face_recognizer):
    # make a copy of the image as we don't want to chang original image
    img = test_img.copy()
    # detect face from the image
    face, rect = detect_face(img)
    # predict the image using our face recognizer
    label, confidence = face_recognizer.predict(face)
    # get name of respective label returned by face recognizer
    # draw a rectangle around face detected
    draw_rectangle(img, rect)
    # draw name of predicted person
    draw_text(img, label_dict.get(label), rect[0], rect[1] - 5)

    return img, confidence,label_dict.get(label)

# In[5]:
def main(frame):
    #let's first prepare our training data
    #data will be in two lists of same size
    #one list will contain all the faces
    #and other list will contain respective labels for each face
    print("Preparing data...")
    faces, labels = prepare_training_data("/home/prakash/ubuntu/database")
    print("Data prepared")
    #format labels
    unique_labels = list(set(labels))
    count = 1
    label_dict = {}
    for entry in unique_labels:
        label_dict[count] = entry
        count = count+1

    temp_labels = []
    for entry in labels:
        for key,value in label_dict.items():
            if entry.lower() == value.lower():
                temp_labels.append(key)


    #create our LBPH face recognizer
    face_recognizer = cv2.face.LBPHFaceRecognizer_create()
    face_recognizer.train(faces,np.array(temp_labels))


    # Now that we have the prediction function well defined, next step is to actually call this function on our test images and display those test images to see if our face recognizer correctly recognized them. So let's do it. This is what we have been waiting for.

    # In[10]:

    # print("Predicting images...")



    # #load test images
    it = 1
    # while it<=20:
    #         print("Taking Picture....")
    #         time.sleep(3)
    #         cap = cv2.VideoCapture(0) # video capture source camera (Here webcam of laptop)
    #         ret,frame = cap.read() # return a single frame in variable `frame`
    #         if frame is None or ret is None:
    #             print("Error in capture Retrying...")
    #             it = it + 1
    #         else:
    #             break


    try:
        #perform a prediction
        predicted_img3,confidence,label = predict(frame,label_dict,face_recognizer)
        #cam release
        # cap.release()

        #display both images
        if int(confidence)>=30:
            print("USER:",label)
            return label
        else:
            print("Cant Recognize you....")
            print("CONFIDENCE:",confidence)
            return 1
    except Exception as e:
        print("Can't Identify you.....")
        print(e)
        return 1
