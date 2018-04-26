from piwho import recognition
import sys, os 

recog = recognition.SpeakerRecognizer()

class Speaker_Recognization_Train(object):

    def __init__(self,BASE_DIR):
        self.BASE_DIR = BASE_DIR
        pass 
 
    def train(self):
        print("START TRAINING VOICE.....")
        os.system("rm -rf %s"%("speakers.txt"))
        os.system("rm -rf %s"%("*.gzbin"))
        data_folder_path = self.BASE_DIR+"/database"
        dirs = os.listdir(data_folder_path)
        res_arr = []  
        for folder in dirs:
                file_path = os.path.join(data_folder_path, folder)
                if not os.path.isdir(file_path) or "test_data" in file_path:
                   continue
                inp_file = [e for e in os.listdir(file_path) if (len(e.split(".wav")) ==2) ][0]
                f_name = inp_file.split(".wav")[0] 
                new_path = os.path.join(file_path, "%s.wav"%f_name)
                res_arr.append([f_name, new_path])

        for (f_name, fpath) in res_arr[:]:
            recog.speaker_name = f_name
            recog.train_new_data(fpath)
        print("STOP TRAINING VOICE.....")
        return

    def test(self, audio_file):
        self.train()
        recog.debug = True
        name = recog.identify_speaker(audio_file)
        dictn = {}
        try:
            dictn = recog.get_speaker_scores()
        except Exception as ex:
           pass
        res_arr = [(v, k) for k, v in dictn.items()]
        res_arr.sort()
        print("VOICE RECO NAME:",res_arr[0][1])
        if res_arr:
            return res_arr[0][1]
        return ''


if __name__ == '__main__':
    obj = Speaker_Recognization_Train("/home/rajesh/Personal/axis-bank-hackathon/application")
    obj.train()
    res = obj.test("/home/rajesh/Personal/axis-bank-hackathon/application/database/test_data/test.wav")
    print(res) 
