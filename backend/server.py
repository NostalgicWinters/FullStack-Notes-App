from flask import Flask, jsonify, request
import projectdb
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*", methods=["GET", "POST", "OPTIONS"])

@app.route("/members")
def member():
    return {"members": ['https://imgs.search.brave.com/4i-W8aMLxqx7t9QbOct58RxzkkErVuDj_EYCuROH3R4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZXJl/YmlpLm5ldC9wbGF5/cG9rZW1vbi8yMDI1/L25haWNkcm9wcy5q/cGc', 'https://imgs.search.brave.com/UDxbrPGplW8qmcDFmPkpX43EFcHvNob0TWYCotHZrRE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG9rZW1vbi5jb20v/c3RhdGljLWFzc2V0/cy9jb250ZW50LWFz/c2V0cy9jbXMyL2lt/Zy9hdHRlbmQtZXZl/bnRzL190aWxlcy9w/b2tlbW9uLWxlYWd1/ZS9sZWFybi10by1w/bGF5LXRjZy9sZWFy/bi10by1wbGF5LXRj/Zy0xNjktZW4ucG5n', 'https://imgs.search.brave.com/WPy04zn1Bv5vX5DFx-cAbrqP37oH3ADUNmkQNTMm8vY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vQklO/RkEtV2FsbC1BcnQt/cG9rZW1vbi1Bbmlt/ZS0xMi1pbi14LTE4/LWluLVdhbGwtUG9z/dGVyXzBmM2I0NDk3/LWUyODctNGUyZC1h/YzdhLTMxNjVjZDkw/MDMwZi4zM2ZhNmJl/NzQzMzNkYzVjM2Ex/Mjg0YzU1YjJlN2Nl/YS5qcGVnP29kbkhl/aWdodD01ODAmb2Ru/V2lkdGg9NTgwJm9k/bkJnPUZGRkZGRg']}

@app.route("/members/api")
def membersapi():
    data = projectdb.showdb()
    return jsonify(data)

@app.route("/notes/api")
def notesapi():
    data = projectdb.showtable()
    return jsonify(data)

@app.route("/notes/delete", methods=["POST"])
def delete_note():
    data = request.get_json()
    note_id = data.get("id")

    if not note_id:
        return jsonify({"error": "Missing note id"}), 400

    projectdb.mycursor.execute("DELETE FROM NOTES WHERE id=%s", (note_id,))
    projectdb.mydb.commit()

    return jsonify({"success": True})

@app.route("/notes/add", methods=["POST"])
def add_note():
    data = request.get_json()
    heading = data.get("heading")
    para = data.get("para")

    if not heading or not para:
        return jsonify({"error": "Missing fields"}), 400

    projectdb.mycursor.execute("USE NOTESAPP")
    projectdb.mycursor.execute(
        "INSERT INTO NOTES (heading, para) VALUES (%s, %s)",
        (heading, para)
    )
    projectdb.mydb.commit()

    note_id = projectdb.mycursor.lastrowid

    return jsonify({"success": True, "new_note": {"id": note_id, "heading": heading, "para": para}})

@app.route("/notes/search", methods=["POST"])
def search_note():
    arr = []
    data = request.get_json()
    value = data.get("value")

    projectdb.mycursor.execute("USE NOTESAPP")
    projectdb.mycursor.execute("SELECT * FROM NOTES WHERE HEADING=%s",(value,))
    for id,heading,para in projectdb.mycursor:
        arr.append({"id":id,"heading": heading, "para": para})
    return jsonify({"notes": arr})
        
if __name__ == "__main__":
    app.run(debug=True)