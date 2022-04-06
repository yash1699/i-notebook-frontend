import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {

    return (
        <div className='container'>
            <h2 className='mb-3'>iNotebook is your solution for safely saving your notes on the cloud.</h2>
            <p style={{ fontSize: "22px" }}>Add a note and access it wherever and whenever you need it. Update or delete the note with one click. Your notes are safe here on the cloud.</p>

            { !localStorage.getItem('authToken') ?
                <div>
                    <p style={{ fontSize: "22px" }}>To continue using iNotebook please create an account with us(or login to your account).</p>
                    <div className="d-flex justify-content-center">
                        <Link className="btn btn-primary mx-2" to="/login">Login</Link>
                        <Link className="btn btn-primary mx-2" to="/signup">Sign Up</Link>
                    </div>
                </div>
                : <div className="d-flex justify-content-center" style={{ fontSize: "20px" }}>Keep using iNotebook.</div>}

        </div>
    )
}

export default About
