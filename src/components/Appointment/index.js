import React from "react";
import Header from "./Header"
import Show from "./Show"
import Empty from "./Empty"
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss"
import Form from "./Form";
import Confirm from "./Confirm";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE ";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
      .bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => transition(ERROR_SAVE), true);
  }

  function deleteAppointment(id) {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch(error => transition(ERROR_DELETE), true);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_SAVE && <Error message="Could not save the appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete the appointment" onClose={back} />}
      {mode === CONFIRM && <Confirm
        message={CONFIRM}
        onCancel={() => back()}
        onConfirm={() => (deleteAppointment(props.id))}
      />
      }
      {mode === EDIT && (
        <Form
          onCancel={back}
          id={props.id}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          onSave={save}
          //edit={true}
          name={props.interview.student}
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          id={props.id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}

    </article>
  );
}