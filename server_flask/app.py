from flask import Flask, render_template, request, redirect, url_for, Response, redirect
app = Flask(__name__)

import io
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import pandas as pd
import pymssql


connection = pymssql.connect(server="213.140.22.237\SQLEXPRESS", user="cilibeanu.nicolae",password="xxx123##",database="cilibeanu.nicolae")


@app.route('/', methods=['GET'])
def home():
    return render_template("homepage.html")

@app.route('/servizio1', methods=['GET'])
def serv1():
  query= 'select museo.nome,opera.totolo,artista.nome,artista.cognome,personaggio.nome from museo inner join opera on museo.ID = opera.IDM inner join artista on opera.IDA = artista.id inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id'
  df1 = pd.read_sql(query,connection)
  return render_template("1servizio.html", nomicolonne = df1.columns.values, dati = list(df1.values.tolist()))






if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3245, debug=True)