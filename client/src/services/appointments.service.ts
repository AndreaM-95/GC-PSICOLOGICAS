import type { ICancelarCita, ICita } from "../types";
import api from "./api";

export const createAppointmentRequest = async (data: ICita) => {
  return api.post('/appointments', data);
};

export const patientAppointmentsRequest = async (document:number) =>{
    const response = await api.get(`/appointments/patient/${document}`);
    return response.data;
}

export const allPatientAppointmentsRequest = async (document:number) =>{
    const response = await api.get(`/appointments/patients/${document}`);
    return response.data;
}

export const updateAppointmentRequest = async (data:ICita) =>{
    const response = await api.put('/appointments/patient', data);
    return response.data;
}

export const cancelAppointmentRequest = async (data:ICancelarCita) =>{
    const response = await api.patch('/appointments/cancel', data);
    return response.data;
}