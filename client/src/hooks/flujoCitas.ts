import { useState } from "react";
import { patientAppointmentsRequest } from "@/services/appointments.service";
import { usePatientSearch } from "./usePatientSearch";
import { usePatientsData } from "./usePatientsData";
import { useAppToast } from "./useAppToast";

export function flujoCitas() {
    const { showMessage } = useAppToast();
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
    const { patients } = usePatientsData(showMessage);
    const { filteredPatients, searchPatient } = usePatientSearch(patients);

    const loadAppointments = async (document: string) => {
        try {
            const response = await patientAppointmentsRequest(parseInt(document));
            const active = response.citas.filter(
                (app: any) => app.estado === "Confirmada"
            );
            setAppointments(active);
        } catch (error: any) {
            console.error("Error al cargar citas:", error);
            const backendMessage =
                error.response?.data?.message?.message ||
                "Error al cargar las citas del paciente.";
            showMessage("error", backendMessage);
        }
    };

    const selectPatient = async (patient: any) => {
        setSelectedPatient(patient);
        setSelectedAppointment(null);

        if (!patient?.numeroDocumento) {
            showMessage("warn", "Paciente inválido");
            return;
        }

        try {
            await loadAppointments(patient.numeroDocumento);
        } catch (error: any) {
            const backendMessage =
                error.response?.data?.message?.message ||
                "Error al cargar las citas del paciente.";

            showMessage("error", backendMessage);
        }
    };

    const selectAppointment = (appointment: any) => {
        setSelectedAppointment(appointment);
    };

    const reset = () => {
        setSelectedPatient(null);
        setSelectedAppointment(null);
        setAppointments([]);
    };

    return {
        filteredPatients,
        selectedPatient,
        appointments,
        selectedAppointment,
        searchPatient,
        selectPatient,
        selectAppointment,
        reset
    };
}