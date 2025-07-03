import { useState, useEffect } from "react"
import React from 'react'
import Card from "./comp/card";
import AddCard from "./comp/addCard";

function App() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pressed, setPressed] = useState(false)
  const [value, setValue] = useState("")

  useEffect(() => {
  fetch("http://localhost:5000/notes/api")
    .then(res => res.json())
    .then(data => {
      setData(data.notes || []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Fetch error:", err);
      setError("Failed to load notes");
      setLoading(false);
    });
}, []);


  const handleAdd = async (heading, para) =>{
    try{
      const response = await fetch("http://localhost:5000/notes/add",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({heading,para})
      });

      const result = await response.json();
      if(result.success){
        setData(prev => [...prev, result.new_note])
      }

    } catch (err){
      console.log("Add Error:", err)
    }
  }

  const onPressed = () => setPressed(true)

  const onCancel = () => setPressed(false)

  const handleSearch = async (value) => {
    try{
      const response = await fetch("http://localhost:5000/notes/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({value})
      });
      const result = await response.json();
      if(result.notes){
        setData(result.notes);
      }
    } catch(err){
      console.error("Search error:", err)
    }
  }

  const handleDelete = async (id) => {
  try {
    await fetch("http://localhost:5000/notes/delete", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });
    setData(data.filter(note => note.id !== id));
  } catch (err) {
    console.error("Delete error:", err);
  }
};

  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 min-h-screen">
      <div className="flex justify-center my-[32px]">
        <h1 className="text-purple-900 font-bold text-5xl">My Notes</h1>
      </div>
      <div className="flex justify-center mx-[16px]">
        <input value={value} onChange={(e)=>setValue(e.target.value)} className="p-[8px] bg-[#FAF9F6] rounded-xl w-[64rem]" placeholder="Search notes..."></input>
        <button onClick={()=>handleSearch(value)} className="bg-purple-700 text-white p-[16px] rounded-xl ml-[8px]"><img src="icons8-search.svg" className="h-[20px] w-[20px] mx-[8px] inline" />Search</button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 p-8">
        {loading?(
          <p className="text-center mt-10 text-purple-800">Loading Notes...</p>
        ): error ? (
          <p>{error}</p>
        ):(
          data.map((note, index)=>(
            <Card key={note.id} id={note.id} heading={note.heading} para={note.para} onDelete={handleDelete} />
        ))
        )}
        <AddCard onClick={onPressed} onCancel={onCancel} handleAdd={handleAdd} pressed={pressed} />
      </div>
    </div>
  )
}

export default App