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
  query= 'select museo.nome,opera.titolo,artista.nome,artista.cognome,personaggio.nome from museo inner join opera on museo.ID = opera.IDM inner join artista on opera.IDA = artista.id inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id'
  df1 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua1 = df1)


@app.route('/servizio2', methods=['GET'])
def serv2():
  titolo_ins = request.args['titolo_ins']
  query = f"select nome from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on personaggio.id = appartiene.idP where titolo = '{titolo_ins}'"
  df2 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua2 = df2)

@app.route('/servizio3', methods=['GET'])
def serv3():
  pers_ins = request.args['pers_ins']
  query = f"select museo.nome, museo.citta, museo.paese from museo inner join opera on museo.id = opera.idM inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id where personaggio.nome = '{pers_ins}'"
  df3 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua3 = df3)

@app.route('/servizio4', methods=['GET'])
def serv4():
  nomeartista = request.args['nomeartista']
  cognomeartista = request.args['cognomeartista']
  query = f"select museo.nome, museo.citta, museo.paese, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM inner join artista on opera.idA = artista.id where artista.nome ='{nomeartista}' and artista.cognome ='{cognomeartista}' group by museo.nome, museo.citta, museo.paese having count(titolo) = (select max(tot_opere) from (select museo.nome, museo.citta, museo.paese, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM inner join artista on opera.idA = artista.id where artista.nome ='{nomeartista}' and artista.cognome ='{cognomeartista}' group by museo.nome, museo.citta, museo.paese) as tot)"
  df4 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua4 = df4)

@app.route('/servizio5', methods=['GET'])
def serv5():
  nomeins = request.args['nomeins']
  cognomeins = request.args['cognomeins']
  query = f"select nome, cognome, data_nascita, data_decesso, citta_natale, paese_natale, citta_decesso, paese_decesso from artista where nome='{nomeins}' and cognome='{cognomeins}'"

  df5 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua5 = df5)

  
@app.route('/servizio6', methods=['GET'])
def serv6():
  
  query = "select * from artista"
  df6 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua6 = df6)

    
@app.route('/servizio7', methods=['GET'])
def serv7():
  tecnicascelta = request.args['tecnicascelta']
  query= f"select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.stile, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where tecnica ='{tecnicascelta}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.stile having count(titolo) = (select max(tot_opere) from (select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.stile, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where tecnica ='{tecnicascelta}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.stile) as tot)"
  df7 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua7 = df7)

@app.route('/servizio8', methods=['GET'])
def serv8():
  stileins = request.args['stileins']
  query= f"select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where opera.stile='{stileins}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica having count(titolo) = (select max(tot_opere) from (select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where opera.stile='{stileins}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica) as tot)"


  df8 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua8 = df8)

@app.route('/servizio9', methods=['GET'])
def serv9():
  query= "select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome having count(titolo) = (select max(tot_opere) from (select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome)as tot)"
  df9 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua9 = df9)

@app.route('/servizio10', methods=['GET'])
def serv10():
  query= "select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome having count(titolo) = (select min(tot_opere) from (select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome)as tot)"
  df10 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua10 = df10)


@app.route('/servizio11', methods=['GET'])
def serv11():
  titoloins = request.args['titoloins']
  query=f"select * from opera where titolo='{titoloins}'"
  df11 = pd.read_sql(query,connection)
  return render_template("1servizio.html", visua11 = df11)













if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3245, debug=True)