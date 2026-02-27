import { useState, useEffect } from "react";
import { getPatients } from "@/services/user.service";
import { patientAppointmentsRequest } from "@/services/appointments.service";

export function flujoCitas() {
    const [patients, setPatients] = useState<any[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

    useEffect(() => {
        loadPatients();
    }, []);

    const loadPatients = async () => {
        const pats = await getPatients();
        setPatients(
            pats.map((p: any) => ({
                id: p.idPersona,
                document: p.numeroDocumento,
                name: `${p.nombres} ${p.apellidos}`,
            }))
        );
    };

    const searchPatient = (query: string) => {
        const filtered = patients.filter(p =>
            p.document.toString().includes(query)
        );
        setFilteredPatients(filtered);
    };

    const loadAppointments = async (document: string) => {
        const response = await patientAppointmentsRequest(parseInt(document));
        const active = response.citas.filter(
            (app: any) => app.estado === "Confirmada"
        );
        setAppointments(active);
    };

    const selectPatient = async (patient: any) => {
        setSelectedPatient(patient);
        
        setSelectedAppointment(null);
        if(appointments.length == 0){
            console.info("No hay citas activas");
        }
        await loadAppointments(patient.document);
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