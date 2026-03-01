import { useState } from "react";
import { createAppointmentRequest } from "../services/appointments.service";
import type { ICita } from "../types";

export function useCreateAppointmentForm(showSuccess: any, showError: any ) {
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<string | number>("");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [placeMeeting, setPlaceMeeting] = useState<string>("");
    const [spaceMeeting, setSpaceMeeting] = useState<string>("");
    const [reason, setReason] = useState<string>("");

    const cleanForm = () => {
        setSelectedProfessional("");
        setSelectedPatient("");
        setDate(null);
        setTime(null);
        setPlaceMeeting("");
        setSpaceMeeting("");
        setReason("");
    };

    const createAppointment = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedPatient || !selectedProfessional || !date || !time || !placeMeeting) {
            showError("error","Todos los campos son obligatorios.");
            return;
        }

        const hours = time.getHours();
        if (hours < 8 || hours >= 17) {
            showError("error","La hora debe estar entre las 8:00 AM y las 5:00 PM.");
            return;
        }

        const newAppointment: ICita = {
            idProfesional: Number(selectedProfessional),
            idPaciente: selectedPatient.id,
            fechaCita: date.toISOString().split("T")[0],
            horaCita: time.toTimeString().slice(0, 5),
            modalidad: placeMeeting.toLowerCase() as 'presencial' | 'virtual',
            consultorio: spaceMeeting.toString().toLowerCase(),
            motivo: reason
        };

        try {
            await createAppointmentRequest(newAppointment);
            cleanForm();
            showSuccess("success","Cita creada con éxito.");
        } catch (error: any) {
            const backendMessage =
                error.response?.data?.message?.message ||
                "Error inesperado al crear la cita.";

            showError("error", backendMessage);
        }
    };

    return {
        selectedPatient,
        setSelectedPatient,
        selectedProfessional,
        setSelectedProfessional,
        date,
        setDate,
        time,
        setTime,
        placeMeeting,
        setPlaceMeeting,
        spaceMeeting,
        setSpaceMeeting,
        reason,
        setReason,
        createAppointment
    };
}