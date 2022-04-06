import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import alertContext from '../context/alerts/alertContext';

const Navbar = (props) => {

    let location = useLocation();
    let navigate = useNavigate();

    const context = useContext(alertContext);

    const { showAlert } = context;

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('authToken');
        navigate("/login");
        showAlert("Logged out successfully.", "primary");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    { !localStorage.getItem('authToken') ? <form className="d-flex">
                        <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-outline-primary mx-1" to="/signup" role="button">Sign Up</Link>
                    </form> :
                    <div className='d-flex'>
                        <div className='mt-2 mx-2' style={{color: "white"}}>{props.userName}</div>
                        <button className="btn btn-outline-primary mx-1" onClick={handleLogout}>Logout</button>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
