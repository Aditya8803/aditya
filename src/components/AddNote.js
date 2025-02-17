import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})
    
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
        setNote({title:"", description:"",tag:""})
        props.showAlert(" Added successfully", "success")
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange = {onChange}
              value={note.title}
            />

          </div>
          <div className="form-group my-3">
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange = {onChange}
              value={note.description}
            />
          </div>

          <div className="my-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange = {onChange}
              value={note.tag}
            />
          </div>


          <button type="submit" disabled={note.title.length<5 || note.description.length<5}className="btn btn-primary" onClick = {handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
