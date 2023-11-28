import pandas as pd
import os
import firebase_admin
from firebase_admin import credentials, firestore

dir = os.path.dirname(os.path.realpath(__file__))

platos_data = pd.read_csv('platos.csv')
rute_credentials = os.path.join(dir, 'munch-match-app-firebase-admin.json')

cred = credentials.Certificate(rute_credentials)
firebase_admin.initialize_app(cred)
db = firestore.client()

def get_student_data():
    students_ref = db.collection('students')
    students_docs = students_ref.stream()
    
    students_data = []
    
    for student_doc in students_docs:
        student_data = student_doc.to_dict()
        students_data.append(student_data)
        
    return pd.DataFrame(students_data)

students_data = get_student_data()["studentData"]


student_profile = {}

for student in students_data:
    student_id = student[0]["codigo"]
    profile = {
        'nombre': student[0]['nombre'],
        'califiaciones_gustos': student[2]
    }
    student_profile[student_id] = profile

print(platos_data.head())
