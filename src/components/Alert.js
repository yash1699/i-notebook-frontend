import React, { useContext } from 'react'
import alertContext from '../context/alerts/alertContext'

const Alert = (props) => {

    const context = useContext(alertContext);
    const {alert} = context;

    return (
        <div style={{ height: "50px", marginBottom: "10px" }}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                {alert.msg}
            </div>}
        </div>
    )
}

export default Alert
