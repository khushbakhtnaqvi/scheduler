//get all appointments for a selected day
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
  return filteredDay[0].appointments.map((appointmentId) => state.appointments[appointmentId])
}

//get interview object to create a new appointment
export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const id = interview.interviewer;//incoming data
  const student = interview.student;//incoming data
  const details = state.interviewers[id];//need to fetch from interviewers

  const new_obj = {};//construct new obj
  new_obj['student'] = student;
  new_obj['interviewer'] = details;
  return new_obj;
}

//get interviewers for a particular day
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
  return filteredDay[0].interviewers.map((interviewerId) => state.interviewers[interviewerId])
}

//get update empty number of spots for a particular day
export function emptySpots(appointments, days, day) {
  const filteredDay = days.filter(d => d.name === day);
  const listOfAppointmentIds = filteredDay[0].appointments;
  const listOfEmptyAppointment = listOfAppointmentIds.filter(appId => !appointments[appId].interview);
  const spots = listOfEmptyAppointment.length;
  return spots;
};