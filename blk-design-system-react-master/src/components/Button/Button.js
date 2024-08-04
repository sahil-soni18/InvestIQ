import React, { useState } from "react";
import "../../assets/css/CustomCSS/AnimatedButton.css";
import { FaBell } from "react-icons/fa";
import SetAlert from "../Notification/SetAlert";

export default function NotificationButton(props) {

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };




  return (
    <>
    <button className="animated-button" onClick={togglePopup}>
           
        
      <FaBell className="notification-icon" />
      Set Notification
    </button>
        <SetAlert show={showPopup} handleClose={togglePopup} company={props.company} />
    </>
  );
}
