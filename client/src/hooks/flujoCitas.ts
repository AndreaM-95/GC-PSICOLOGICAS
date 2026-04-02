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

    /**
     * @description Función que carga las citas activas de un paciente específico. Se realiza una solicitud al backend utilizando el número de documento del paciente para obtener sus citas. Luego, se filtran las citas para mostrar solo aquellas que están confirmadas. Si ocurre un error durante la carga, se captura el mensaje del backend y se muestra al usuario.
     * @param document Parámetro que representa el número de documento del paciente cuyas citas se desean cargar. Se espera que sea una cadena de texto que pueda ser convertida a un número entero para realizar la solicitud al backend.
     */
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

    /**
     * @description Función que maneja la selección de un paciente para visualizar sus citas. Al seleccionar un paciente, se actualiza el estado `selectedPatient` y se restablece la selección de cita. Luego, se carga las citas del paciente utilizando su número de documento. Si el paciente seleccionado no tiene un número de documento válido, se muestra una advertencia al usuario.
     * @param patient Parámetro que representa el paciente seleccionado. Se espera que sea un objeto que contenga al menos la propiedad `numeroDocumento`, la cual se utiliza para cargar las citas del paciente. Si el paciente no tiene un número de documento válido, se muestra una advertencia al usuario.
     * @returns Devuelve void. Esta función no retorna ningún valor, pero actualiza el estado del componente para reflejar la selección del paciente y sus citas correspondientes.
     */
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

    /**
     * @description Función que restablece la selección de paciente, cita y la lista de citas. Esta función se utiliza para limpiar el estado del componente cuando el usuario desea volver a seleccionar un paciente o simplemente desea limpiar la información mostrada. 
     */
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