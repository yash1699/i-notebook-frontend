import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from "../context/alerts/alertContext";

const NoteItem = (props) => {

    const { note, updateNote, setProgress } = props;

    const context = useContext(noteContext);
    const { deleteNote } = context;

    const contextAlert = useContext(alertContext);
    const {showAlert} = contextAlert;

    const handleDelete = (e)=>{
        e.preventDefault();
        setProgress(40);
        try {
            if(deleteNote(note._id)){
                showAlert("Note Deleted Successfully!", "success");
                setProgress(100);
            } else{
                showAlert("Some error occurred. Please try again later.", "danger")
                setProgress(100);
            }
        } catch (error) {
            showAlert("Some error occurred. Please try again later after some time.", "danger");
            setProgress(100);
        }
    }

    return (
        <div className="col-md-3 my-2">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={handleDelete}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
