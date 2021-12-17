import{ useState, useEffect } from "react";
import { emptySpots } from "helpers/selectors"
import axios from "axios";

export default function useApplicationData(props) {
  //setting state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  
  //function to book interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //fetching remaining spots on that day after booking the interview
    const remainingSpots = emptySpots(appointments, state.days, state.day);

    //getting array index of the selected day
    const dayId = state.days.findIndex(item => item.name === state.day);
    
    //update the remaining spots in the state
    const dayObj = {
      ...state.days[dayId],
      spots: remainingSpots
    };

    //making a shallow copy if state
    const days = [
      ...state.days,
    ];

    //assigning the copy of state to the days at index of the day
    days[dayId] = dayObj;

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days })
      })
  }
  //function to cancel interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //fetching remaining spots on that day after booking the interview
    const remainingSpots = emptySpots(appointments, state.days, state.day);

    //getting array index of the selected day
    const dayId = state.days.findIndex(item => item.name === state.day);
    
    //update the remaining spots in the state
    const dayObj = {
      ...state.days[dayId],
      spots: remainingSpots
    };
    //making a shallow copy if state
    const days = [
      ...state.days,
    ];

    //assigning the copy of state to the days at index of the day
    days[dayId] = dayObj;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  };

  // useEffect hook to make requests from axios
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

  return { state, setDay, bookInterview, cancelInterview };
}