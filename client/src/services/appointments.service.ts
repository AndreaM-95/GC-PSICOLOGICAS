import type { ICancelarCita, ICita, ITodasLasCitas, IUpdateAppointment } from "../types";
import api from "./api";

export const createAppointmentRequest = async (data: ICita) => {
  return api.post('/appointments', data);
};

export async function patientAppointmentsRequest (document:number): Promise<ITodasLasCitas>{
    const response = await api.get<ITodasLasCitas>(`/appointments/patient/${document}`);
    return response.data;
}

export async function allPatientAppointmentsRequest (document: number): Promise<ITodasLasCitas> {
    const response = await api.get<ITodasLasCitas>(`/appointments/patients/${document}`);
    return response.data;
};

export const updateAppointmentRequest = async (data:IUpdateAppointment) =>{
    const response = await api.put('/appointments/update', data);
    return response.data;
}

export const cancelAppointmentRequest = async (data:ICancelarCita) =>{
    const response = await api.patch('/appointments/cancel', data);
    return response.data;
}