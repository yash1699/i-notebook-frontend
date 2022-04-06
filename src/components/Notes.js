import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from "../context/alerts/alertContext";
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {

    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote } = context;

    const contextAlert = useContext(alertContext);
    const { showAlert } = contextAlert;


    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            getAllNotes();
        }
        else {
            navigate("/about");
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        setProgress(40);
        refClose.current.click();
        try {
            if (editNote(note.id, note.etitle, note.edescription, note.etag)) {
                setProgress(100);
                showAlert("Note updated successfully", "success");
            } else {
                setProgress(100);
                showAlert("Some error occurred. Please try again later.", "danger");
            }
        } catch (error) {
            setProgress(100);
            showAlert("Some error occurred. Please try again later after some time.", "danger");
        }
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleLogout = (e) => {
        e.preventDefault();
        setProgress(50);
        localStorage.removeItem('authToken');
        navigate("/login");
        showAlert("Logged out successfully.", "primary");
        setProgress(100);
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    return (
        <>
            <AddNote setProgress={props.setProgress}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch edit modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 1 || note.edescription.length < 1} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2" style={{ fontSize: '20px' }}>
                    {notes.length === 0 && 'No Notes to display.'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} setProgress={setProgress} />
                })}
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
        </>
    )
}

export default Notes
