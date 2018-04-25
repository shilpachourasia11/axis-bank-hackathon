from piwho import recognition
import sys, os 

recog = recognition.SpeakerRecognizer()

class Speaker_Recognization_Train(object):

    def __init__(self):
        #  ("Training Model ...............") 
        pass 
 
    def train(self):
         
        os.system("rm -rf %s"%("speakers.txt"))
         
        os.system("rm -rf %s"%("*.gzbin"))
           
        data_folder_path = "/home/prakash/ubuntu/database"
        dirs = os.listdir(data_folder_path)
        res_arr = []  
        for folder in dirs:

                file_path = os.path.join(data_folder_path, folder)
                if not os.path.isdir(file_path):
                   continue   
                inp_file = [e for e in os.listdir(file_path) if (len(e.split(".wav")) ==2) ][0]
                f_name = inp_file.split(".wav")[0] 
                fpath  = os.path.join(file_path, inp_file)                                  
                new_path = os.path.join(file_path, "%s.wav"%f_name) 
                res_arr.append([f_name, new_path])

        for (f_name, fpath) in res_arr[:]:       
            print("training=====================", f_name, fpath)  
            recog.speaker_name = f_name
            recog.train_new_data(fpath)
        return 

    def test(self, audio_file):
        #self.train()
        recog.debug = True
        name = recog.identify_speaker(audio_file)
        dictn = {} 
        try:
            dictn = recog.get_speaker_scores()
            # (dictn)
        except Exception as ex:
           pass         
        #  ("OIUT", dictn)
        res_arr = [(v, k) for k, v in dictn.items()]
        res_arr.sort()
        print("============== res_arr", res_arr)
        if res_arr:

            return res_arr[0][1] 
        return ''


if __name__ == '__main__':
    obj = Speaker_Recognization_Train()
    #obj.train()
    res = obj.test("/home/prakash/ubuntu/test.wav")
    print(res) 
