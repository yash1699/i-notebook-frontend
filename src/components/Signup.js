import React, { useState, useContext } from 'react';
import alertContext from "../context/alerts/alertContext";
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const context = useContext(alertContext);

    const {showAlert} = context;

    const {setUserName, setProgress} = props;

    const host = process.env.REACT_APP_HOST;

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})

    const validateForm = (email, password, cpassword)=>{
        

        if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            showAlert('Invalid Email.', "danger");
            return false;
        }

        if(password !== cpassword) {
            showAlert('Passwords does not match, please renter password.', "danger");
            return false;
        }

        return true;

    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setProgress(20);

        const {name, email, password, cpassword} = credentials;

        if(!validateForm(email, password, cpassword)) {
            return ;
        }
        setProgress(50);

        try {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, email, password})
            });
            const json = await response.json();
            setProgress(70);

            if(response.status === 200 ){
                // Save the auth token and redirect
                localStorage.setItem('authToken', json.authToken);
                localStorage.setItem('userName', name);
                setProgress(90)
                setUserName(name);
                showAlert("Account created successfully", "primary");
                navigate("/");
                setProgress(100);
            } else {
                showAlert("Some error occurred. Please try again later.", "danger");
                setProgress(100);
            }
        } catch (error) {
            showAlert("Some error occurred. Please try again later after some time.", "danger");
            setProgress(100);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container mt-2">
            <h2>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={onChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
