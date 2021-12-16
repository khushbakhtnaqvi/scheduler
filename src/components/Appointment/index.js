import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss"
import Form from "./Form";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE ";
  const SAVING = "SAVING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)
    })
    console.log(props.id, interview);
  }
  
  return (
    <article className="appointment">
      {/*{appointment(props)}*/}
      <Header time={props.time}/>
      {/* {props.interview ? <Show 
      id={props.id}
      time={props.time}
      student={props.interview.student} 
      interviewer={props.interview.interviewer} /> : <Empty/>} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
  
    </article>
  );
}


  /*const appointment = (props) => {
    
    if (!props.time) {
      return "no appointment";
    }
    return props.time;
  }*/