import AlertContext from './alertContext';
import {  useState } from 'react';

const AlertState = (props) => {

  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const values = {
    showAlert: showAlert,
    alert: alert
  }

  return (
    <AlertContext.Provider value={values}>
        {props.children}
    </AlertContext.Provider>
)
}

export default AlertState;
