import pandas as pd
import os
import firebase_admin
from firebase_admin import credentials, firestore
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def dir(rute):
    d = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(d, rute)

platos_data = pd.read_csv(dir('platos.csv'))
rute_credentials = os.path.join(dir('munch-match-app-firebase-admin.json'))

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

platos_data = platos_data.set_index('Nombre de la receta')

students_profile = {}

for index, student in enumerate(students_data):
    cod_student = student[0]['codigo']
    profile = {
        'nombre': student[0]['nombre'],
        'aguacate': student[2]['aguacate'],
        'arroz': student[2]['arroz'],
        'cebolla': student[2]['cebolla'],
        'cerdo': student[2]['cerdo'],
        'champinones': student[2]['champiñones'],
        'lechuga': student[2]['lechuga'],
        'legumbres': student[2]['legumbres'],
        'maiz': student[2]['maiz'],
        'mariscos': student[2]['mariscos'],
        'papa': student[2]['papa'],
        'pasta': student[2]['pasta'],
        'pescado': student[2]['pescado'],
        'pollo': student[2]['pollo'],
        'res': student[2]['res'],
        'tofu': student[2]['tofu'],
        'tomate': student[2]['tomate'],
        'vegetales': student[2]['vegetales'],
        'zanahoria': student[2]['zanahoria'],
    }
    students_profile[cod_student] = profile

df_students = pd.DataFrame(students_profile).T

df_students = df_students.drop(['nombre'], axis=1)

df_plates = platos_data.drop(['Marca temporal', 'Leche', 'Restaurante', 'Maduro', 'Pico de gallo', 'Queso', 'Atún', 'Pan', 'Tortilla', 'Huevo', 'Frijol negro', 'Sour Cream', 'Guacamole', 'Chicharrón', 'Salsa bechamel', 'Tocineta', 'Carne molida', 'Apio', 'Salsa napolitana','Yuca', 'Salsa pesto', 'Piña'], axis=1)

nuevas_columnas = {
    'Pollo': 'pollo',
    'Tomate': 'tomate',
    'Res': 'res',
    'Cerdo': 'cerdo',
    'Lechuga': 'lechuga',
    'Cebolla': 'cebolla',
    'Maíz': 'maiz',
    'Spaghetti': 'pasta',
    'Arroz': 'arroz',
    'Champiñón': 'champinones',
    'Pescado': 'pescado',
    'Papa': 'papa',
    'Frijol': 'legumbres',
    'Brócoli': 'vegetales',
    'Aguacate': 'aguacate',
    'Camarón': 'mariscos',
    'Zanahoria': 'zanahoria',
    'Salsa teriyaki': 'tofu', 
}

df_plates = df_plates.rename(columns=nuevas_columnas)

#print(df_plates.astype(float))

#print(df_students.astype(float), )

similarity_matrix = cosine_similarity(df_students.astype(float), df_plates.astype(float))


recomendations = {}

#for student_id, student_profile in students_profile.items():
#    similarity_scores = similarity_matrix[student_id]
#    score = sum(similarity_scores)
#    recomendations[student_id] = {'nombre': student_profile["nombre"], 'similitud':score}

#sorted_recomendations = sorted(recomendations.items(), key=lambda x: x[1]['similitud'], reverse=True )

#for student_id, info_recomendation in sorted_recomendations:
    #print(f"student_id: {student_id}, nombre: {info_recomendation['nombre']}, similitud: {info_recomendation['similitud']}")


students_profile = pd.DataFrame(students_profile)
    
def get_recomendation(codigo):
    student_id = students_profile.columns.get_loc(codigo)
    
    similarity_scores = cosine_similarity(df_students.T.iloc[:, student_id].values.reshape(1, -1), df_plates.values)
    
    df_similitudes = pd.DataFrame(similarity_scores.T, index = df_plates.index, columns=['similitud'])
    
    plato_recomendado = df_similitudes.sort_values(by= 'similitud', ascending=False).index.tolist()
    
    
    return plato_recomendado

tu_plato = {}

#for student in students_profile:
#    tu_plato[student] = get_recomendation(student)
    
    

#print(tu_plato)


# GET Endpoint

@app.route("/plate_recomendation", methods=["POST"])
def plate_recomendation():
    datos = request.get_json()
    
    parametro = datos.get('parametro', None)
    
    if parametro is not None:
        result = get_recomendation(parametro)
        return jsonify({'result': result})
    else:
        return jsonify({'error': 'Parámetro flatante'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5050)