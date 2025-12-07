import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { InputNumber } from "primereact/inputnumber";
import { AutoComplete } from 'primereact/autocomplete';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Divider } from "primereact/divider";
import { cancelAppointmentRequest, patientAppointmentsRequest } from "../../services/appointments.service";
import { getPatients } from "../../services/user.service";
import type { ICancelarCita } from "../../types";
import NavButton from "../NavButton";

export default function CancelAppointment() {
    const toast = useRef<Toast>(null);
    const [documentPatient, setDocumentPatient] = useState<string>("");
    const [appointmentsPatient, setAppointmentsPatient] = useState<any[]>([]);
    const [patient, setPatient] = useState("");
    const [codAppointment, setCodAppointment] = useState<number | null>(null);
    const [reason, setReason] = useState("");
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

    // Cargar citas del paciente seleccionado
    const loadPatientAppointments = async (document: string) => {
        try {
            const response = await patientAppointmentsRequest(parseInt(document));
            const activeAppointments = response.citas.filter((app: any) => app.estado === "Confirmada");
            setAppointmentsPatient(activeAppointments);

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

    // Cancelar cita
    const cancelAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPatient || !codAppointment || !reason) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Todos los campos requeridos deben estar completos',
                life: 3000
            });
            return;
        }

        const cancelData: ICancelarCita = {
            idCita: codAppointment,
            motivo: reason
        }

        try {
            const response = await cancelAppointmentRequest(cancelData);
            console.log("Respuesta de cancelación:", response);
            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Cita cancelada con éxito',
                life: 3000,
            });
            
            // Actualizar la lista de citas después de cancelar
            if (selectedPatient) {
                await loadPatientAppointments(selectedPatient.document);
            }
            
            cleanForm();
        } catch (error: any) {
            console.error("Error completo:", error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || "Error al cancelar la cita",
                life: 3000
            });
        }
    };
    
    // Formatear la fecha de la cita
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const cleanForm = () => {
        setSelectedPatient(null);
        setPatient("");
        setDocumentPatient("");
        setCodAppointment(null);
        setReason("");
        setAppointmentsPatient([]);
        setSelectedAppointment(null);
    };

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '100%' }} >
            <Toast ref={toast} />
            <form 
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={cancelAppointment}
            >
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
                    className="col-span-2"
                />

                <Divider className="col-span-2"/>

                <label htmlFor="patient" className="font-bold text-cyan-700">Paciente:</label>
                <InputText
                    id="patient"
                    value={patient}
                    placeholder="Nombre del paciente.."
                    readOnly
                />

                <label htmlFor="codAppointment" className="font-bold text-cyan-700">Código de la cita seleccionada:</label>
                <InputNumber
                    id="codAppointment"
                    value={codAppointment}
                    placeholder="Código.."
                    readOnly
                />

                <label htmlFor="reason" className="font-bold text-cyan-700">Motivo de cancelación:</label>
                <InputText
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Escribe aquí.."
                />

                <label className="font-bold text-cyan-700">Citas activas del paciente:</label>
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
                            <Column field="idCita" header="COD"  style={{color: '#49A7CC'}}></Column>
                            <Column 
                                field="fechaCita" 
                                header="Fecha" 
                                body={(rowData) => formatDate(rowData.fechaCita)}
                                style={{color: '#49A7CC'}}
                            ></Column>
                            <Column field="horaCita" header="Hora" style={{color: '#49A7CC'}}></Column>
                            <Column field="estado" header="Estado" style={{color: '#49A7CC'}}></Column>
                        </DataTable>
                    ): (
                        <Card className="text-center">
                            <div className="flex text-center align-items-center justify-content-center">
                                <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                                <h3>No hay citas activas</h3>
                            </div>
                        </Card>
                    )}
                </div>

                <div className="col-span-2 flex justify-end">
                    <NavButton type="submit" label="Cancelar cita" btnFunction={() => console.log('click')} />
                </div>
            </form>
        </Card>
    );
}