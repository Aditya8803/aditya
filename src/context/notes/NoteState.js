 import NoteContext from "./noteContext";
import { useState } from "react"; 
const NoteState = (props)=>{
    const host = "http://localhost:5000/"
    const notesInitial =  [] 
    const [notes, setNotes] = useState(notesInitial)  
   
    //get all Notes
const getNotes = async () =>{
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token':localStorage.getItem('token')
            }
        })
        const json = await response.json()
        setNotes(json);
      }

    //Add a note
      const addNote = async(title,description,tag)=>{
        //TODo Api call
        const response = await fetch(`${host}api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note = await response .json()
        setNotes(notes.concat(note))
      }
    //Delete a note
    const deleteNote = async (id)=>{
        //TODO : API Call
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token':localStorage.getItem('token')
            },
        });
 

    //if the id != note._id it will get into newNotes
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
    }

    //Edit a Note
    const editNote = async (id, title, description, tag) =>{
        //API CALL
        
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        })

        let newNotes = JSON.parse(JSON.stringify(notes))
        //LOGIC TO EDIT IN CLIENT
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
            break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;