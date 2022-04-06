import React, { useContext, useState } from 'react';
import alertContext from '../context/alerts/alertContext';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);

    const noteInitial = {title: "", description: "", tag: "General"};
    const [note, setNote] = useState(noteInitial);

    const contextAlert = useContext(alertContext);
    const { showAlert } = contextAlert;

    const {setProgress} = props;

    const handleClick = (e)=>{
        e.preventDefault();
        setProgress(40);

        try {
            if(addNote(note.title, note.description, note.tag)){
                showAlert("Note addded successfully", "success");
                setProgress(90)
            }
            else{
                showAlert("Some error occurred. Please try again later.", "danger");
            }
            setNote(noteInitial);
            setProgress(100);
        } catch (error) {
            showAlert("Some error occurred. Please try again later after some time.", "danger")
            setProgress(100);
        }
    }
    
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    const { addNote } = context;
    return (
        <div className="container my-3">
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title"aria-describedby="emailHelp" onChange={onChange} value={note.title} minLength={1} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange}value={note.description} minLength={1} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                </div>
                
                <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
