import React, { useState, useEffect } from "react";
import {emptySpots, updateSpots} from "helpers/selectors"
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
  
  

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const remainingSpots = emptySpots(appointments,state.days,state.day)
    const dayId=state.days.findIndex(item=>item.name===state.day);
    const dayObj = {
      ...state.days[dayId],
      spots: remainingSpots
    }
    const days = [
      ...state.days,
    ]
    days[dayId] = dayObj;

    //const days = updateSpots(state, "bookAppointment")
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({...state, appointments, days})
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const remainingSpots = emptySpots(appointments,state.days,state.day)
    const dayId=state.days.findIndex(item=>item.name===state.day);            
    const dayObj = {
      ...state.days[dayId],
      spots: remainingSpots
    }
    const days = [
      ...state.days,
    ]
    days[dayId] = dayObj;
    
    //const days = updateSpots(state)
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days}));
  } 

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
    });
  }, []);

  return { state,  setDay, bookInterview, cancelInterview }
}