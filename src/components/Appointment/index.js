import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import "components/Appointment/styles.scss"

export default function Appointment(props) {
  return (
    <article className="appointment">
      {/*{appointment(props)}*/}
      <Header time={props.time}/>
      {props.interview ? <Show 
      id={props.id}
      time={props.time}
      student={props.interview.student} 
      interviewer={props.interview.interviewer} /> : <Empty/>}
      
  
    </article>
  );
}


  /*const appointment = (props) => {
    
    if (!props.time) {
      return "no appointment";
    }
    return props.time;
  }*/