import React, { useState, useContext } from 'react';
import alertContext from "../context/alerts/alertContext";
import { useNavigate } from "react-router-dom";

const Login = (props) => {

    const context = useContext(alertContext);

    const {setProgress} = props;

    const {showAlert} = context;

    const host = process.env.REACT_APP_HOST;

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({email: "", password: ""})

    const validateForm = (email, password)=>{
    
        if(!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            showAlert('Invalid Email.');
            return false;
        }

        return true;
    }
    
    const getUserDetails = async ()=>{
        setProgress(60);
        try {
            const response = await fetch(`${host}/api/auth/getuser/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('authToken')
                }
            });

            const user = await response.json();
            localStorage.setItem('userName', user.name);
            props.setUserName(user.name);
            setProgress(80);
            

        } catch (error) {
            console.log(error);
            showAlert("Failed to get user data.", "danger");
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const {email, password} = credentials;
        setProgress(10);

        if(!validateForm(email, password)){
            showAlert("Enter a valid email", "danger");
            return;
        }
        setProgress(20);

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: credentials.email, password: credentials.password})
            });
            const json = await response.json();
            setProgress(40);

            if(response.status === 200 ){
                // Save the auth token and redirect
                localStorage.setItem('authToken', json.authToken)
                showAlert("Logged in successfully", "primary");
                getUserDetails();
                navigate("/");
                setProgress(100);
            } else {
                showAlert("Invalid Credentials!", "danger");
                setProgress(100);
            }
        } catch (error) {
            console.log(error)
            showAlert("Some error occurred. Please try again later after some time", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="container mt-2">
            <h2>Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange}  id="password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
export default Login
