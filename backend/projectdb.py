import pymysql

mydb = pymysql.connect(host='localhost', user='root', passwd='sql@3000')

mycursor = mydb.cursor()
mycursor.execute("USE NOTESAPP")

def showdb():
    arr = []
    mycursor.execute("SHOW DATABASES")
    for db in mycursor:
        arr.append(db[0])
    return {"databases": arr}

def showtable():
    arr = []
    mycursor.execute("SELECT * FROM NOTES")
    for id,heading,para in mycursor:
        arr.append({"id":id,"heading": heading, "para": para})
    return {"notes": arr}


