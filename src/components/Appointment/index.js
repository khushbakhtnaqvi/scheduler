import React from "react";
import "components/Appointment/styles.scss"

export default function Appointment(props) {
  
  return (
    <article className="appointment">{appointment(props)}</article>
  );
}


  const appointment = (props) => {
    
    if (!props.time) {
      return "no appointment";
    }
    return props.time;
  }