import React, { useState,useContext, useEffect, useRef} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
let navigate = useNavigate();
  const { notes, getNotes, editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate("/login")
    }
  })
  const [note, setNote] = useState({id:"",etitle:"", edescription:"", etag:""})
    
  const updateNote = (currentNote) =>{
    ref.current.click();
    setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag})
    
  }

  const handleClick = (e) =>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click()
    props.showAlert(" Updated successfully", "success")
    // addNote(note.title, note.description,note.tag);
}

const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  const ref = useRef(null)
  const refClose = useRef(null)

  return (
    <>
    <AddNote showAlert={props.showAlert}/> 

  <button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      {/* update form start */}
      <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              onChange = {onChange}
              value = {note.etitle}
              minLength={5} required
            />

          </div>
          <div className="form-group my-3">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange = {onChange}
              value = {note.edescription}
              minLength={5} required
            />
          </div>

          <div className="my-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              onChange = {onChange}
              value = {note.etag}
              minLength={5} required
            />
          </div>
        </form>

        {/* update form over */}
      </div>
      <div className="modal-footer">
        <button type="button" ref = {refClose} className="btn btn-secondary" data-bs-dismiss="modal" disabled={note.etitle.length<5 || note.edescription.length<5 }>Close</button>
        <button type="button" onClick = {handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>


      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length===0 && 'No Notes to display'}
      </div>

        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  );
};

export default Notes;
