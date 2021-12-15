export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(d => d.name === day);
  if (filteredDay.length === 0) {
    return [];
  }
  return filteredDay[0].appointments.map((appointmentId) => state.appointments[appointmentId])
  
//const filteredAppointments = filteredDay.map(appt => appt.appointments).flat();
//   const data = [];
//    for (const appt of filteredAppointments) {
//       data.push(state.appointments[appt])
//    }
//   return data;
 }

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
  console.log("new object", new_obj);
  return new_obj;
}