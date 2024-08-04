import React, { useState, useContext } from 'react';
import { Button, Input } from "reactstrap";
import '../../assets/css/CustomCSS/setAlert.css';
import { loginContext } from "../../context/ContextAPI";
import axios from "axios"

const SetAlert = ({ handleClose, show, company }) => {
    const loginState = useContext(loginContext);
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
             await axios.post('http://localhost:5000/setAlert', {
                price,
                stock: company,
                email: loginState.email // Include the email in the request body
            });
            alert(`Notification Set... ${loginState.email}`);
        } catch (error) {
            console.error('Error setting alert:', error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="popup">
            <div className="popup-main">
                <h2 className='heading' style={{color: "black"}}>Set Alert</h2>
                <Input
                    className="Input-Field"
                    placeholder="Price"
                    type="text"
                    id="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <Button className="btn-round loginButton" onClick={handleSubmit} color="primary" type="submit">
                    Set Notification
                </Button>
                <button className='popup-close' onClick={handleClose}>Close</button>
            </div>
        </div>
    );
}

export default SetAlert;
