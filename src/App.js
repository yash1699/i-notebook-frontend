import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from 'react';
import AlertState from './context/alerts/AlertState';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import LoadingBar from 'react-top-loading-bar';

function App() {

  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : "");

  console.log("user: " + localStorage.getItem('userName'))

  const [progress, setProgress] = useState(0);

  return (
    <>
      <NoteState>
        <Router>
          <AlertState>
            <Navbar userName={userName} />
            <LoadingBar
              color="#0275d8"
              progress={progress} />
            <Alert />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home setProgress={setProgress}/>} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/login" element={<Login setUserName={setUserName} setProgress={setProgress}/>} />
                <Route exact path="/signup" element={<Signup setUserName={setUserName} setProgress={setProgress}/>} />
              </Routes>
            </div>
          </AlertState>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
