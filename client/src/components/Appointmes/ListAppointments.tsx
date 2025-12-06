import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import NavButton from "../NavButton";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import AppointmentCard from "../AppointmentCard";
import { Toast } from 'primereact/toast';
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";
import { AutoComplete } from "primereact/autocomplete";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getPatients } from "../../services/user.service";
import { allPatientAppointmentsRequest, patientAppointmentsRequest } from "../../services/appointments.service";


export default function ListAppointments() {
    const toast = useRef<Toast>(null);
    const [documentPatient, setDocumentPatient] = useState<string>("");
    const [appointmentsPatient, setAppointmentsPatient] = useState<any[]>([]);
    const [patient, setPatient] = useState("");
    const [codAppointment, setCodAppointment] = useState<number | null>(null);
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);


    // Cargar pacientes al montar el componente
    useEffect(() => {
        async function loadPatients() {
            try {
                const pats = await getPatients();
                setPatients(
                    pats.map((p: any) => ({
                        id: p.idPersona,
                        document: p.numeroDocumento,
                        name: `${p.nombres} ${p.apellidos}`,
                    }))
                );
                console.log("PACIENTES:", pats);
            } catch (err: any) {
                console.error("Error cargando pacientes:", err);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los pacientes',
                    life: 3000
                });
            }
        }
        loadPatients();
    }, []);
    
    // Buscar pacientes por documento mientras se escribe
    const searchPatient = (event: { query: string }) => {
        const query = event.query;
        const filtered = patients.filter(patient => 
            patient.document.toString().includes(query)
        );
        setFilteredPatients(filtered);
                console.log('Search Query:', event.query);
    };

    // Cuando se selecciona un paciente
        const onPatientSelect = (e: { value: any }) => {
            const selected = e.value;
            setSelectedPatient(selected);
            setPatient(selected.name);
            setDocumentPatient(selected.document);
            setCodAppointment(null);
            setSelectedAppointment(null);
            loadPatientAppointments(selected.document);
        };
    
    const loadPatientAppointments = async (document: string) => {
        try {
            const response = await allPatientAppointmentsRequest(parseInt(document));

            // Orden personalizado
            const statusOrder: Record<string, number> = {
                "Confirmada": 1,
                "Asistida": 2,
                "Cancelada": 3,
                "No asistida": 4
            };

            const sortedAppointments = response.citas.sort(
                (a: any, b: any) => statusOrder[a.estado] - statusOrder[b.estado]
            );

            setAppointmentsPatient(sortedAppointments);

        } catch (err: any) {
            console.error("Error cargando citas:", err);
            setAppointmentsPatient([]);

            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al cargar las citas del paciente',
                life: 3000
            });
        }
    };


        // Cuando se selecciona una cita
    const onAppointmentSelect = (appointment: any) => {
        setSelectedAppointment(appointment);
        setCodAppointment(appointment.idCita);
    };

    // Formatear la fecha de la cita
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };
    
    
    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto' }} >
            <Toast ref={toast} />

            <div className="w-full flex justify-center">
                <AutoComplete
                    id="documentPatient"
                    value={documentPatient}
                    suggestions={filteredPatients}
                    completeMethod={searchPatient}
                    field="document"
                    onChange={(e) => setDocumentPatient(e.value)}
                    onSelect={onPatientSelect}
                    placeholder="Ingrese documento del paciente"
                    aria-label="Buscar paciente por documento"
                    dropdown
                    className="w-3/4"
                />
            </div>

            <Divider/>
            
            <div className="card">
                {appointmentsPatient.length > 0 ? (
                    <DataTable 
                        value={appointmentsPatient} 
                        selectionMode="single"
                        selection={selectedAppointment}
                        onSelectionChange={(e) => onAppointmentSelect(e.value)}
                        dataKey="idCita"
                        responsiveLayout="scroll"
                        emptyMessage="No se encontraron citas activas"
                    >
                        <Column field="idCita" header="ID Cita"  style={{color: '#49A7CC'}}></Column>
                        <Column field="estado" header="Estado" style={{color: '#49A7CC'}}></Column>
                        <Column 
                            field="fechaCita" 
                            header="Fecha" 
                            body={(rowData) => formatDate(rowData.fechaCita)}
                            style={{color: '#49A7CC'}}
                        ></Column>
                        <Column field="horaCita" header="Hora" style={{color: '#49A7CC'}}></Column>
                        <Column field="profesional" header="Profesional"  style={{color: '#49A7CC'}}></Column>
                        <Column field="modalidad" header="Modalidad"  style={{color: '#49A7CC'}}></Column>
                        <Column field="consultorio" header="Consultorio"  style={{color: '#49A7CC'}}></Column>
                    </DataTable>
                ): (
                    <Card className="text-center">
                        <div className="flex text-center align-items-center justify-content-center">
                            <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                            <h3>No hay registro de citas</h3>
                        </div>
                    </Card>
                )}
            </div>
        </Card>
    );
}