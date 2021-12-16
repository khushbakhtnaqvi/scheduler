import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import useApplicationData from "hooks/useApplicationData";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {appointments}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
// export default function Application(props) {
//   const [state, setState] = useState({
//     day: "Monday",
//     days: [],
//     appointments: {}
//   });

//   const setDay = day => setState({ ...state, day });
//   const setDays = days => setState(prev => ({ ...prev, days }));
//   console.log("getAppointmentsForDay", state)
//   const appointments = getAppointmentsForDay(state, state.day);
//   const schedule = appointments.map((appointment) => {
//     const interviewers = getInterviewersForDay(state, state.day)
//   const interview = getInterview(state, appointment.interview);
//     return (
//       <Appointment
//         key={appointment.id}
//         id={appointment.id}
//         time={appointment.time}
//         interview={interview}
//         interviewers={interviewers}
//         bookInterview={bookInterview}
//         cancelInterview={cancelInterview}
//       />
//     );
//   });

//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     return axios.put(`/api/appointments/${id}`, {interview})
//     .then(() => {
//       setState({...state, appointments})
//     })
//   }

//   function cancelInterview(id) {
//     const appointments = {
//       ...state.appointments[id],
//       interview: null
//     };
//     // const days = [
//     //   ...state.days,
//     // ]
//     //days[dayId] = dayObj;    
//     return axios.delete(`/api/appointments/${id}`)
//       .then(() => setState({ ...state, appointments}));
//   } 

//   useEffect(() => {
//     Promise.all([
//       axios.get('/api/days'),
//       axios.get('/api/appointments'),
//       axios.get('/api/interviewers')
//     ]).then((all) => {
//       const [days, appointments, interviewers] = all;
//       setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
//     });
//   }, []);

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList
//             days={state.days}
//             value={state.day}
//             onChange={setDay}
//           />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">
//         {schedule}
//         <Appointment key="last" time="5pm" />
//       </section>
//     </main>
//   );
// }
