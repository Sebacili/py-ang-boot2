from flask import Flask, render_template, request, redirect, url_for, Response, redirect, jsonify
from flask_cors import CORS

import pandas as pd
import pymssql


app = Flask(__name__)
CORS(app)

conn = pymssql.connect(server="213.140.22.237\SQLEXPRESS", user="cilibeanu.nicolae",password="xxx123##",database="cilibeanu.nicolae")
cursor = conn.cursor()


@app.route('/', methods=['GET'])
def home():
    return render_template("homepage.html")

# Ritorna la lista dei musei 
#@app.route('/servizio1', methods=['GET'])
#def serv1():
# query= 'select museo.nome,opera.titolo,artista.nome,artista.cognome,personaggio.nome from museo inner join opera on museo.ID = opera.IDM inner join artista on opera.IDA = artista.id inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id'
# df1 = pd.read_sql(query,conn)
# return jsonify(df1)



# Ritorna la lista dei musei 
@app.route('/api/musei', methods=['GET'])
def get_musei():
  data = request.args.get('museo')

  q = 'select museo.nome,opera.titolo,artista.nome,artista.cognome,personaggio.nome from museo inner join opera on museo.ID = opera.IDM inner join artista on opera.IDA = artista.id inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id' + (' WHERE museo.nome LIKE %(data)s' if data != None and data != '' else "")
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()

  return jsonify(data)






####################

# Ritorna personaggi
@app.route('/api/personaggi', methods=['GET', "POST"])
def get_personaggi():
  personaggio = request.args.get('personaggi')
  # personaggio = 'Giacomo maggiore'

  q = f"select Personaggio.nome, opera.titolo, opera.immagine from opera inner join appartiene on opera.id = appartiene.idO inner join Personaggio on Personaggio.id = appartiene.idP where Personaggio.nome = '{personaggio}'" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################




#####################

# Visualizzazione personaggi in cui compaiono in un'opera specifica, inserita dall'utente
@app.route('/api/opera_personaggi', methods=['GET', "POST"])
def opera_personaggi():
  opera = request.args.get('opera')
  # opera = 'Cena in Emmaus'

  q = f"select personaggio.nome, opera.titolo, opera.tecnica, opera.data_creazione,opera.immagine from Personaggio inner join Appartiene on Personaggio.id = Appartiene.idP inner join opera on Appartiene.idO = Opera.id where titolo = '{opera}'" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################





#####################

# Visualizzazione opera specifica
@app.route('/api/opera_titolo', methods=['GET', "POST"])
def opera_titolo():
  titolo = request.args.get('titolo')
  # titolo = 'La Velata'

  q = f"select * from opera where titolo = '{titolo}'" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################






#####################

# Visualizzazione tutti gli info di tutti gli artisti
@app.route('/api/artisti', methods=['GET', "POST"])
def artisti():

  q = "select * from artista" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################





#####################

# Visualizzazione tutti gli info di tutti gli artisti
@app.route('/api/anno_data_artisti', methods=['GET', "POST"])
def anno_data_artisti():
  anno=request.args.get('annoinserito')
  int_anno = int(anno)
  # anno = 1483

  q = f"SELECT * FROM artista WHERE DATEPART(year, data_nascita) = {anno}" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################





#####################

# Visualizzazione tutti gli info di tutti gli artisti
@app.route('/api/elencopersonaggi', methods=['GET', "POST"])
def elencopersonaggi():

  q = "select * from personaggio" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################




#####################

# Visualizzazione tutti gli info di tutti gli artisti
@app.route('/api/suggerimento', methods=['GET', "POST"])
def suggerimento():

  if request.method == 'POST':
    name_user=request.args.get('name_user')
    strname_user=str(name_user)
    email=request.args.get('email')
    stremail=str(email)
    message=request.args.get('message')
    strmessage=str(message)



    # name_user='Invicta12'
    # email='vxvzSDFvz@gmail.com'
    # message='hello'

    #query
    cursor = conn.cursor(as_dict=True)
    q = 'INSERT INTO suggerimento (opinione,nome_utente,email) VALUES (%(message)s, %(name_user)s, %(email)s)'
    cursor.execute(q, params={'message': strmessage, 'name_user': strname_user, 'email': stremail})
    conn.commit()
    return jsonify(request.args)

#####################





#####################

# Visualizzazione tutti gli info di tutti gli artisti
@app.route('/api/elencoopere', methods=['GET', "POST"])
def elencoopere():

  q = "select * from Opera" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################





#####################

# Visualizzazione tutti gli info di tutti gli artisti
@app.route('/api/elencomusei', methods=['GET', "POST"])
def elencomusei():

  q = "select * from Museo" 
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

#####################







#visualizzare museo
#@app.route('/servizio3', methods=['GET'])
#def serv3():
#museo_personaggio = request.args['museo_personaggio']
#query = f"select museo.nome, museo.citta, museo.paese from museo inner join opera on museo.id = opera.idM inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id where personaggio.nome = '{data}'"
#df3 = pd.read_sql(query,conn)
#return render_template("1servizio.html", visua3 = df3)
#


#visualizzare museo inserendo personaggio

@app.route('/api/museo_personaggio', methods=['GET'])
def get_museo_personaggio():
  data = request.args.get('museo_personaggio')

  q = f"select museo.nome, museo.citta, museo.paese from museo inner join opera on museo.id = opera.idM inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id where personaggio.nome = '{data}'" + (' WHERE personaggio.nome LIKE %(data)s' if data != None and data != '' else "")
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()

  return jsonify(data)




#########################

  #visualizzazione museo che mostra più opere di un'artista specifico
@app.route('/api/artista_musei', methods=["GET", "POST"])
def get_artista_musei():
  artist_name = request.args.get('nome_artista')
  artist_surname = request.args.get('cognome_artista')

  # artist_name = 'Vincent Willem'
  # artist_surname = 'Van Gogh'

  q = f"select museo.nome, museo.citta, museo.paese, museo.immagine, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM inner join artista on opera.idA = artista.id where artista.nome ='{artist_name}' and artista.cognome ='{artist_surname}' group by museo.nome, museo.citta, museo.paese, museo.immagine having count(titolo) = (select max(tot_opere) from (select museo.nome, museo.citta, museo.paese, museo.immagine, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM inner join artista on opera.idA = artista.id where artista.nome ='{artist_name}' and artista.cognome ='{artist_surname}' group by museo.nome, museo.citta, museo.paese, museo.immagine) as tot)"
  df = pd.read_sql(q,conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

 ########################




#@app.route('/servizio5', methods=['GET'])
#def serv5():
  #5.visualizzazione informazione di un artista inserito dall’utente
#nomeins = request.args['nomeins']
#cognomeins = request.args['cognomeins']
#query = f"select nome, cognome, data_nascita, data_decesso, citta_natale, paese_natale, citta_decesso, paese_decesso from artista where nome='{nomeins}' and cognome='{cognomeins}'"

 #df5 = pd.read_sql(query,conn)
 #return render_template("1servizio.html", visua5 = df5)

@app.route('/api/nomecognome_artista', methods=['GET'])
def get_nomecognome_artista():
  nomeartista = request.args.get('museo_personaggio')
  cognomeartista =  request.args.get('museo_personaggio')
  q = f"select nome, cognome, data_nascita, data_decesso, citta_natale, paese_natale, citta_decesso, paese_decesso from artista where nome='{nomeartista}' and cognome='{cognomeartista}'"
  if nomeartista is not None and nomeartista != '':
      q += f" WHERE artista.nome LIKE '%{nomeartista}%'"
  if cognomeartista is not None and cognomeartista != '':
      q += f" AND artista.cognome LIKE '%{cognomeartista}%'"
  
  cursor = conn.cursor(as_dict=True)
  cursor.execute(query, (nomeartista,cognomeartista))
  data = cursor.fetchall()
  return jsonify(data)
#informazioni su tutti gli artisti
#@app.route('/servizio6', methods=['GET'])
#def serv6():
  
# query = "select * from artista"
# df6 = pd.read_sql(query,conn)
# return render_template("1servizio.html", visua6 = df6)





###################

#ritorna i musei che contiene più opere create con una tecnica specifica scelta dall’utente 
@app.route('/api/tecnica_museo', methods=["GET", "POST"])
def get_tecnica_museo():
  data = request.args.get('tecnica')
  # data = 'olio su tela'

  q = f"select DISTINCT museo.nome, museo.citta, museo.paese, museo.immagine, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where tecnica ='{data}' group by museo.nome, museo.citta, museo.paese, museo.immagine, opera.titolo, opera.data_creazione, opera.stile having count(titolo) = (select max(tot_opere) from (select museo.nome, museo.citta, museo.paese, museo.immagine, opera.titolo, opera.data_creazione, opera.stile, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where tecnica ='{data}' group by museo.nome, museo.citta, museo.paese, museo.immagine, opera.titolo, opera.data_creazione, opera.stile) as tot)"
  df = pd.read_sql(q, conn)
  res = list(df.fillna("NaN").to_dict("index").values())
  return jsonify(res)

####################





#@app.route('/servizio8', methods=['GET'])
#def serv8():
# stileins = request.args['stileins']
# query= f"select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where opera.stile='{stileins}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica having count(titolo) = (select max(tot_opere) from (select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where opera.stile='{stileins}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica) as tot)"
#
#
# df8 = pd.read_sql(query,conn)
# return render_template("1servizio.html", visua8 = df8)


@app.route('/api/stile_museo', methods=['GET'])
def get_stile_museo():
  data = request.args.get('stileins')

  q = "select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where opera.stile='{data}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica having count(titolo) = (select max(tot_opere) from (select museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica, count(titolo) as tot_opere from museo inner join opera on museo.id = opera.idM where opera.stile='{data}' group by museo.nome, museo.citta, museo.paese, opera.titolo, opera.data_creazione, opera.tecnica) as tot)" + (' WHERE artista.nome LIKE %(data)s' if data != None and data != '' else "")
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()

#visualizzazione personaggio che compare in più opere
#@app.route('/servizio9', methods=['GET'])
#def serv9():
#  query= "select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome having count(titolo) = (select max(tot_opere) from (select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome)as tot)"
#  df9 = pd.read_sql(query,conn)
#  return render_template("1servizio.html", visua9 = df9)


@app.route('/api/personaggio_opere_max', methods=['GET'])
def get_personaggio_opere_max():
  data = request.args.get('personaggio_opere')

  q = "select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome having count(titolo) = (select max(tot_opere) from (select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome)as tot)" 
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()

#visualizzazione del personaggio che compare di meno
#@app.route('/servizio10', methods=['GET'])
#def serv10():
#  query= "select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome having count(titolo) = (select min(tot_opere) from (select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome)as tot)"
#  df10 = pd.read_sql(query,conn)
#  return render_template("1servizio.html", visua10 = df10)

@app.route('/api/personaggio_opere_min', methods=['GET'])
def get_personaggio_opere_min():
  data = request.args.get('personaggio_opere_min')

  q ="select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome having count(titolo) = (select min(tot_opere) from (select personaggio.nome, count(titolo) as tot_opere from opera inner join appartiene on opera.id = appartiene.idO inner join personaggio on appartiene.idP = personaggio.id group by personaggio.nome)as tot)" 
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()


#visualizzazione dell’opera con un titolo inserito dall’utente

#@app.route('/servizio11', methods=['GET'])
#def serv11():
#  titoloins = request.args['titoloins']
#  query=f"select * from opera where titolo='{titoloins}'"
#  df11 = pd.read_sql(query,conn)
#  return render_template("1servizio.html", visua11 = df11)

@app.route('/api/opera_titolo', methods=['GET'])
def get_opera_titolo():
  data = request.args.get('titoloins')

  q =f"select * from opera where titolo='{data}'" + (' WHERE titolo LIKE %(data)s' if data != None and data != '' else "")                                                                                           
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()


#visualizzazione degli artisti deceduti nell’anno inserito dall'utente e le loro opere
#@app.route('/servizio12', methods=['GET'])
#def serv12():
#  datains = request.args['datains']
#  query=f"select artista.nome, artista.cognome, opera.titolo from opera inner join artista on opera.idA = artista.id where data_decesso = '{datains}'"
#  df12 = pd.read_sql(query,conn)
#  return render_template("1servizio.html", visua12 = df12)

@app.route('/api/anno_artista', methods=['GET'])
def get_anno_artista():
  data = request.args.get('datains')

  q =f"select artista.nome, artista.cognome, opera.titolo from opera inner join artista on opera.idA = artista.id where data_decesso = '{data}'" + (' WHERE titolo LIKE %(data)s' if data != None and data != '' else "")                                                                                           
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()

#visualizzazione degli artisti ancora in vita e le loro opere e in quale museo è esposto

#@app.route('/servizio13', methods=['GET'])
#def serv13():
#
#  query=f"select artista.nome, artista.cognome, opera.titolo, opera.tecnica, opera.stile, museo.nome, museo.citta, museo.paese from artista inner join opera on opera.idA = artista.id inner join museo on museo.id = opera.idM where artista.data_decesso is null"
#
#  df13 = pd.read_sql(query,conn)
#  return render_template("1servizio.html", visua13 = df13)

@app.route('/api/artisti_in_vita', methods=['GET'])
def get_artisti_in_vita():
  data = request.args.get('artisti_vivi')

  q =f"select artista.nome, artista.cognome, opera.titolo, opera.tecnica, opera.stile, museo.nome, museo.citta, museo.paese from artista inner join opera on opera.idA = artista.id inner join museo on museo.id = opera.idM where artista.data_decesso is null"                                                                                         
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()



#visualizzazione artisti e le loro opere e in quale musei sono esposti in base alla città natale che è stato inserito dall’utente
#@app.route('/servizio15', methods=['GET'])
#def serv15():
#  cittanatins = request.args['cittanatins']
#  query=f"select artista.nome, artista.cognome, opera.titolo, museo.nome, museo.citta, museo.paese from museo inner join opera on museo.id = opera.idM inner join artista on opera.idA = artista.id where citta_natale = '{cittanatins}'"
#  df15 = pd.read_sql(query,conn)
#  return render_template("1servizio.html", visua15 = df15)


@app.route('/api/cittanatale', methods=['GET'])
def get_cittanatale():
  data = request.args.get('cittanatins')

  q = f"select artista.nome, artista.cognome, opera.titolo, museo.nome, museo.citta, museo.paese from museo inner join opera on museo.id = opera.idM inner join artista on opera.idA = artista.id where citta_natale = '{data}'"  + (' WHERE titolo LIKE %(data)s' if data != None and data != '' else "")                                                                                        
  cursor = conn.cursor(as_dict=True)
  p = {"data": f"%{data}%"}
  cursor.execute(q, p)
  data = cursor.fetchall()

@app.route('/servizio16', methods=['POST'])
def serv16():
  nome_utente = request.form['nome_utente']
  email = request.form['email']
  password = request.form['password']
  query=f"insert into utente(nome_utente,email, passw) values('{nome_utente}','{email}','{password}');"
  df16 = pd.read_sql(query,conn)
  return render_template("1servizio.html", visua16 = df16)


@app.route('/servizio17', methods=['POST'])
def serv17():
  nomeutente = request.form['nome_utente']
  email = request.form['email']
  password = request.form['password']
  query= f"select * from login where nomeutente='{nomeutente}' and email='{email}' and passw='{password}'"
  df17 = pd.read_sql(query,conn)
  return render_template("1servizio.html", visua17 = df17)

  

@app.route('/servizio18', methods=['POST'])
def serv18():
  old_name = request.args['old_name']
  new_name = request.args['new_name']
  new_email = request.args['new_email']
  old_email = request.args['old_email']
  new_password = request.args['new_password']
  current_email = request.args['current_email']

  query=f"update utente set nome_utente = '{new_name}' where nome_utente ='{old_name}'"
  query2=f"update utente set email= '{new_email}' where email='{old_email}'"
  query3=f"update utente set password= '{new_password}' where email='{current_email}'"

  df18 = pd.read_sql(query,conn)
  df19 =  pd.read_sql(query2,conn)
  df20 =  pd.read_sql(query3,conn)
  return render_template("1servizio.html", visua18 = df18,visua10 = df19, visua20 = df20)


  

@app.route('/servizio21', methods=['POST'])
def serv19():
  current_email = request.args['current_email']
  query=f"select nome_utente, email, password from utente where email='{current_email}'"
  df21 = pd.read_sql(query,conn)
  return render_template("1servizio.html", visua21 = df21)

@app.route('/servizio22', methods=['POST'])
def serv22():
  current_name = request.args['current_name']
  current_email = request.args['current_email']
  current_password = request.args['current_password']
  query=f"delete from utente where nome_utente='{current_name}' and email='{current_email}' and password ='{current_password}'"

  df22 = pd.read_sql(query,conn)
  return render_template("1servizio.html", visua22 = df22)



































































































## Register 

@app.route("/register/data", methods=["POST"])
def dati_registrazione():
  nome_utente = request.args.get("nome_utente")
  email = request.args.get("email")
  passw = request.args.get("passw")

  Cq = "SELECT * FROM utente WHERE nome_utente = %(nome_utente)s OR email = %(e)s"
  Ccursor = conn.cursor(as_dict=True)
  Cp = {"nome_utente": nome_utente, "e": email}
  Ccursor.execute(Cq, Cp)
  Cdata = Ccursor.fetchall()

  # print(Cdata)

  if len(Cdata) < 1:
    print(request.args)
    q = 'INSERT INTO utente (nome_utente, email, passw) VALUES (%(nome_utente)s, %(email)s, %(passw)s)'
    cursor = conn.cursor(as_dict=True)
    p = {"nome_utente": f"{nome_utente}","email": f"{email}","passw": f"{passw}"}

    cursor.execute(q, p)
    conn.commit()
    return jsonify({'data': 'Ok!', 'url': 'login'})
  else:
    return jsonify({'data': 'User already exists!', 'url': None})




# @app.route('/info/post/registration', methods=['POST'])
# def registration():
#   datiutenti = request.get_json()
#   nome = datiutenti['name']
#   email = datiutenti['email']
#   passw = datiutenti['passw']
#   cursor = conn.cursor()
#   #inserimento dati in db
#   cursor.execute('insert into utente values (nome_utente, email, passw) Values (%s, %s, %s)', (nome, email, passw))
#   conn.commit()

#   conn.close()
#   return 'dati sono stati salvati'







@app.route('/backend/collaborators', methods=['GET'])
def backend():
  return render_template("backend.html")
    
@app.route('/backend/collaborators/modificadesiderata', methods=['GET'])
def modificadesiderata():
  global entitascelta
  entitascelta = request.args['entita']
  if entitascelta == "Museo":
    query = "select * from museo"
    df1 = pd.read_sql(query,conn)
    return render_template("modifiche.html", nomicolonne = df1.columns.values[1:])
  elif entitascelta == "Artista":
    query = "select * from Artista"
    df1 = pd.read_sql(query,conn)
    return render_template("modifiche.html", nomicolonne = df1.columns.values[1:])
  elif entitascelta == "Opera":
    query = "select * from Opera"
    df1 = pd.read_sql(query,conn)
    return render_template("modifiche.html", nomicolonne = df1.columns.values[1:])
  elif entitascelta == "Personaggio":
    query = "select * from Personaggio"
    df1 = pd.read_sql(query,conn)
    return render_template("modifiche.html", nomicolonne = df1.columns.values[1:])
  else:
    query = "select * from utente"
    df1 = pd.read_sql(query,conn)
    return render_template("modifiche.html", nomicolonne = df1.columns.values[1:])

 

@app.route('/backend/collaborators/modificadesiderata/AggCol', methods=['Post'])
def AggCol():
  nome_colAggCol = request.args['nome_col']
  data_typeAggCol = request.args['data_type']
  if data_typeAggCol == 'varchar':
    query = f"ALTER TABLE {entitascelta} ADD {nome_colAggCol} {data_typeAggCol}(3000);"
    df2 = pd.read_sql(query,conn)
    return render_template("AggCol.html", nom_col = nome_colAggCol, DT = data_typeAggCol, tab = entitascelta)
  else:
    query = f"ALTER TABLE {entitascelta} ADD {nome_colAggCol} {data_typeAggCol};"
    df2 = pd.read_sql(query,conn)
    return render_template("AggCol.html", nom_col = nome_colAggCol, DT = data_typeAggCol, tab = entitascelta)


@app.route('/backend/collaborators/modificadesiderata/ElCol', methods=['Post'])
def ElCol():
  nome_colElCol = request.args['nome_col']
  query = f"ALTER TABLE {entitascelta} DROP COLUMN {nome_colElCol};"
  df2 = pd.read_sql(query,conn)
  return render_template("ElCol.html", nom_col = nome_colElCol, tab = entitascelta)

@app.route('/backend/collaborators/modificadesiderata/RinCol', methods=['Post'])
def RinCol():
  old_nome_col = request.args['nome_col']
  new_nome_col = request.args['new_nome_col']
  query = f"ALTER TABLE {entitascelta} RENAME COLUMN {old_nome_col} to {new_nome_col};"
  df2 = pd.read_sql(query,conn)
  return render_template("RinCol.html", nom_col = old_nome_col, new_nom_col = new_nome_col, tab = entitascelta)

@app.route('/backend/collaborators/modificadesiderata/altDTCol', methods=['Post'])
def altDTCol():
  nome_col = request.args['nome_col']
  new_dt = request.args['data_type']
  query = f"ALTER TABLE {entitascelta} ALTER COLUMN {nome_col} {new_dt};"
  df2 = pd.read_sql(query,conn)
  return render_template("altDTCol.html", nom_col = nome_colElCol, dt = new_dt, tab = entitascelta)


from datetime import datetime
from dateutil import parser

@app.route('/backend/collaborators/modificadesiderata/InsInfo', methods=['Post'])
def InsInfo():
  if entitascelta == "Museo":
    nome = request.args['nome_col_nome']
    citta  = request.args['nome_col_citta']
    paese = request.args['nome_col_paese']
    descrizione = request.args['nome_col_descrizione']
    immagine = request.args['nome_col_immagine']
    query = f"INSERT INTO {entitascelta} (nome, citta, paese, descrizione, immagine) VALUES ('{nome}', '{citta}', '{paese}', '{descrizione}', '{immagine}');"
    df2 = pd.read_sql(query,conn)
    return render_template("InsInfoM.html", nome = nome, citta = citta, paese = paese, descrizione = descrizione, immagine = immagine, tab = entitascelta)
  elif entitascelta == "Artista":
    nome = request.args['nome_col_nome']
    cognome = request.args['nome_col_cognome']
    data_nascita_input = request.args['nome_col_data_nascita']
    data_decesso_input = request.args['nome_col_data_decesso']
# per verificare se il date inputtato è corretto
    try:
      data_nascita = parser.parse(data_nascita_input)
      formatted_data_nascita_str = data_nascita.strftime('%Y-%m-%d')
    except ValueError:
      print("Invalid date format. Please enter the date in YYYY-MM-DD format.")
    try:
      data_decesso = parser.parse(data_decesso_input)
      formatted_data_decesso_str = data_decesso.strftime('%Y-%m-%d')
    except ValueError:
      print("Invalid date format. Please enter the date in YYYY-MM-DD format.")
    citta_natale = request.args['nome_col_citta_natale']
    paese_natale = request.args['nome_col_paese_natale']
    citta_decesso = request.args['nome_col_citta_decesso']
    paese_decesso = request.args['nome_col_paese_decesso']
    biografia  = request.args['nome_col_biografia']
    immagine = request.args['nome_col_immagine']
    query = f"INSERT INTO {entitascelta} (nome, cognome, data_nascita, data_decesso, citta_natale, paese_natale, citta_decesso, paese_decesso, biografia, immagine) VALUES ('{nome}', '{cognome}', '{formatted_data_nascita_str}', '{formatted_data_decesso_str}', '{citta_natale}', '{paese_natale}', '{citta_decesso}', '{paese_decesso}', '{biografia}', '{immagine}');"
    df2 = pd.read_sql(query,conn)
    return render_template("InsInfoA.html", nome = nome, cognome = cognome, data_nascita = formatted_data_nascita_str, data_decesso = formatted_data_decesso_str, citta_natale = citta_natale, paese_natale = paese_natale, citta_decesso = citta_decesso, paese_decesso = paese_decesso, biografia = biografia, immagine = immagine, tab = entitascelta)
  elif entitascelta == "Opera":
    IDM = request.args['nome_col_IDM']
    IDA = request.args['nome_col_IDA']
    titolo = request.args['nome_col_titolo']
    tecnica = request.args['nome_col_tecnica']
    stile = request.args['nome_col_stile']
    data_creazione = request.args['nome_col_data_creazione']
    descrizione = request.args['nome_col_descrizione']
    immagine = request.args['nome_col_immagine']
    query = f"INSERT INTO {entitascelta} (IDM, IDA, titolo, tecnica, stile, data_creazione, descrizione, immagine) VALUES ({IDM}, {IDA}, '{titolo}', '{tecnica}', '{stile}', '{data_creazione}', '{descrizione}', '{immagine}');"
    df2 = pd.read_sql(query,conn)
    return render_template("InsInfoO.html", IDM = IDM, IDA = IDA, titolo = titolo, tecnica = tecnica, stile = stile, data_creazione = data_creazione, descrizione = descrizione, immagine = immagine, tab = entitascelta)
  elif entitascelta == "Personaggio":
    nome = request.args['nome_col_nome']
    query = f"INSERT INTO {entitascelta} (nome) VALUES ('{nome}');"
    df2 = pd.read_sql(query,conn)
    return render_template("InsInfoP.html", nome = nome, tab = entitascelta)
  else:
    nome_utente = request.args['nome_col_nome_utente']
    email = request.args['nome_col_email']
    passw = request.args['nome_col_passw']
    query = f"INSERT INTO {entitascelta} (nome_utente, email, passw) VALUES ('{nome_utente}', '{email}', '{passw}');"
    df2 = pd.read_sql(query,conn)
    return render_template("InsInfoU.html", nome_utente = nome_utente, email = email, passw = passw, tab = entitascelta)


@app.route('/backend/collaborators/modificadesiderata/AggiorInfo', methods=['Post'])
def AggiorInfo():
  nome_col = request.args['nome_col']
  new_val = request.args['new_val']
  id_row = request.args['id']
  if new_val == int:
    query = f"UPDATE {entitascelta} SET {nome_col} = {new_val} WHERE id = {id_row};"
    df2 = pd.read_sql(query,conn)
    return render_template("AggiorInfo.html", nom_col = nome_col, new_val = new_val, id_row = id_row, tab = entitascelta)
  else:
    query = f"UPDATE {entitascelta} SET {nome_col} = '{new_val}' WHERE id = {id_row};"
    df2 = pd.read_sql(query,conn)
    return render_template("AggiorInfo.html", nom_col = nome_col, new_val = new_val, id_row = id_row, tab = entitascelta)


  

@app.route('/backend/collaborators/modificadesiderata/ElInfo', methods=['Post'])
def ElInfo():
  nome_col = request.args['nome_col']
  val_elim = request.args['val_elim']
  if isinstance(val_elim, str) :
    query = f"DELETE FROM {entitascelta} WHERE {nome_col} = '{val_elim}';"
    df2 = pd.read_sql(query,conn)
    return render_template("ElInfo.html", nom_col = nome_col, tab = entitascelta)
  else:
    query = f"DELETE FROM {entitascelta} WHERE {nome_col} = {val_elim};"
    df2 = pd.read_sql(query,conn)
    return render_template("ElInfo.html", nom_col = nome_col, tab = entitascelta)







# @app.route('/backend/collaborators/modificadesiderata/tipodimodificascelta', methods=['GET'])
# def tipodimodifica():
#   tiposcelto = request.args['tipo']
#   if tiposcelto =="Modificare_col":
#     return render_template("Modificare_aggiungere_colonna.html");
#   elif tiposcelto =="Modificare":
#     return render_template("modifica_info.html");
#   elif tiposcelto =="Aggiungere":
#     return render_template("Modificare_aggiungere_colonna.html");
#   else:
#     return render_template("Modificare_aggiungere_colonna.html");






# Funzione per controllare se l'email delll'utente e' presente nel Database
def user_exists(email):
  q = 'SELECT * FROM users WHERE email = %(e)s'
  cursor = conn.cursor(as_dict=True)
  cursor.execute(q, params={"e": email})
  res = cursor.fetchall()
  if len(res) < 1:
    return False
  return True

def get_user(email):
  q = 'SELECT * FROM users WHERE email = %(email)s'
  cursor = conn.cursor(as_dict=True)
  cursor.execute(q, params={"email": email})
  res = cursor.fetchall()
  return res



@app.route('/api/register', methods=['POST'])
def register():
  user_params = {
    "email": request.args.get('email'),
    "nome_ut": request.args.get('nome_ut'),
    "password": request.args.get('password'),
    "reppassw": request.args.get('reppassw'),
  }

  data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
  }

  # Controllo se tutti i parametri sono stati inseriti nella richiesta
  if None not in [*user_params.values()]:
    # Controllo se l'utente esiste gia'
    if not user_exists(user_params["email"]):
      # Inserisco l'utente nel database
      cursor = conn.cursor(as_dict=True)
      q = 'INSERT INTO utente (nome_ut, email, password) VALUES (%(nome_ut)s, %(email)s, %(password)s)'
      cursor.execute(q, params=user_params)
      conn.commit()

      # Restituisco l'utente
      data["data"] = get_user(user_params['email'])
    else:
      data["statusCode"] = 403
      data["errorMessage"] = "User already exists"
  else:
    data["statusCode"] = 400
    data["errorMessage"] = 'Missing values in the request'

  return jsonify(data)


@app.route('/api/login', methods=['POST'])
def login():
  # Prendo gli argomenti richiesti
  email = request.args.get('email')
  password = request.args.get('password')
  nome_ut = request.args.get('nome_ut')

  data = {
    "statusCode": 200,
    "errorMessage": "",
    "data": {}
  }

  # Controllo se nono stati passati tutti i parametri richiesti
  if None not in [email, password, nome_ut]:
    # Prendo le informazioni dell'utente
    q = 'SELECT * FROM utente WHERE email = %(e)s and nome_utente = %(n)s'
    cursor = conn.cursor(as_dict=True)
    cursor.execute(q, params={"e": email, "n": nome_ut})
    res = cursor.fetchall()

    # Controllo se l'utente esiste
    if len(res) < 1:
      data["statusCode"] = 404
      data["errorMessage"] = "No user was found with that email"
    elif not (res[0]["passw"] == password):
      data["statusCode"] = 403
      data["errorMessage"] = "Wrong password"
    else:
      data["data"] = res[0]
  else:
    data['statusCode'] = 400
    data['errorMessage'] = "No email or password provided"
  
  return jsonify(data)




# for a dynamic home
@app.route('/api/dynamicHome/opera', methods=['GET', "POST"])
def dynamicHomeopera():
  tempNumOpera = request.args.get("tempNumOpera")
  inttempNumOpera = int(tempNumOpera)
  # inttempNumOpera = 5
  q = f'select opera.id, opera.titolo, opera.descrizione, opera.immagine from opera where id = {inttempNumOpera}' 
  df = pd.read_sql(q, conn)
  res = list(df.fillna("NaN").to_dict("index").values())    # list(df.to_dict("index").values())
  return jsonify(res)

@app.route('/api/dynamicHome/artista', methods=['GET', "POST"])
def dynamicHomeartista():
  tempNumArtista = request.args.get("tempNumArtista")
  inttempNumArtista = int(tempNumArtista)
  # tempNumArtista = 5
  q = f'select Artista.id, Artista.Nome, Artista.cognome, Artista.biografia, Artista.immagine from Artista where Artista.idfordinamichome = {tempNumArtista}' 
  df = pd.read_sql(q, conn)
  res = list(df.fillna("NaN").to_dict("index").values())    # list(df.to_dict("index").values())
  return jsonify(res)

@app.route('/api/dynamicHome/museo', methods=['GET', "POST"])
def dynamicHomemuseo():
  tempNumMuseo = request.args.get("tempNumMuseo")
  inttempNumMuseo = int(tempNumMuseo)
  # inttempNumMuseo = 5
  q = f'select museo.id, museo.nome, museo.descrizione, museo.immagine from museo where idfordinamichome = {inttempNumMuseo}' 
  df = pd.read_sql(q, conn)
  res = list(df.fillna("NaN").to_dict("index").values())    # list(df.to_dict("index").values())
  return jsonify(res)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3245, debug=True)