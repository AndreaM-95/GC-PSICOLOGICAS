import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import NavButton from "../NavButton";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Toast } from 'primereact/toast';
import { getPatients, getProfessionals } from "../../services/user.service";
import { patientAppointmentsRequest, updateAppointmentRequest } from "../../services/appointments.service";
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { IUpdateAppointment } from "../../types";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export default function UpdateAppointment() {
    const toast = useRef<Toast>(null);
    const [documentPatient, setDocumentPatient] = useState("");
    const [appointmentsPatient, setAppointmentsPatient] = useState<any[]>([]);
    const [codAppointment, setCodAppointment] = useState(0);
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
    
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    
    // Campos para actualizar la cita
    const [patient, setPatient] = useState("");
    const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
    const [newDate, setNewDate] = useState<Date | null>(null);
    const [newTime, setNewTime] = useState<Date | null>(null);
    const [newModality, setNewModality] = useState("");
    const [newConsultory, setNewConsultory] = useState("");
    const [reason, setReason] = useState("");


    // Estados para BD
    const [patients, setPatients] = useState<any[]>([]);
    const [professionals, setProfessionals] = useState<any[]>([]);

    // Crear horas mínimas y máximas
    const minHour = new Date();
    minHour.setHours(8, 0, 0, 0); // 8:00 AM
    const maxHour = new Date();
    maxHour.setHours(17, 0, 0, 0); // 5:00 PM

    const modalidades = [
        { id: 1, name: "Presencial" },
        { id: 2, name: "Virtual" }
    ];

    const consultorios = [
        { id: 1, name: "Consultorio 1" },
        { id: 2, name: "Consultorio 2" },
        { id: 3, name: "No aplica" }
    ];
    
    // Cargar pacientes y profesionales al montar el componente
    useEffect(() => {
        async function loadData() {
            try {
                const pats = await getPatients();
                const profs = await getProfessionals();

                setPatients(
                    pats.map((p: any) => ({
                        id: p.idPersona,
                        document: p.numeroDocumento,
                        name: `${p.nombres} ${p.apellidos}`,
                    }))
                );

                setProfessionals(
                    profs.map((p: any) => ({
                        id: p.profesional.idProfesional,
                        name: `${p.nombres} ${p.apellidos}`,
                        especialidad: p.profesional?.especialidad ?? "N/A",
                    }))
                );
            } catch (err: any) {
                console.error("Error cargando datos:", err);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al cargar los datos',
                    life: 3000
                });
            }
        }
        loadData();
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
        cleanForm();
        const selected = e.value;

        setSelectedPatient(selected);
        setPatient(selected.name);
        setDocumentPatient(selected.document);
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
    
        setSelectedProfessional(appointment.idProfesional);

        if (appointment.fechaCita) {
            setNewDate(new Date(appointment.fechaCita));
        }
        if (appointment.horaCita) {
            const [hours, minutes] = appointment.horaCita.split(':').map(Number);
            const time = new Date();
            time.setHours(hours, minutes, 0, 0);
            setNewTime(time);
        }
        setNewModality(
            appointment.modalidad === "presencial" || appointment.modalidad === "virtual"
                ? appointment.modalidad.charAt(0).toUpperCase() + appointment.modalidad.slice(1)
                : appointment.modalidad
        );
        setNewConsultory(
            appointment.consultorio.charAt(0).toUpperCase() + appointment.consultorio.slice(1)
        );
        setReason(appointment.motivo);
    };

    // Reprogramar cita
    const updateAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPatient || !codAppointment || !newDate || !newTime || !newModality || !newConsultory || !selectedProfessional) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Todos los campos requeridos deben estar completos',
                life: 3000
            });
            return;
        }

        const appointmentData: IUpdateAppointment = {
            idCita: codAppointment,
            idProfesional: Number(selectedProfessional),
            idPaciente: selectedPatient.id,
            fechaCita: newDate.toISOString().split("T")[0],
            horaCita: newTime.toTimeString().slice(0, 5),
            modalidad: newModality.toLowerCase() as 'presencial' | 'virtual',
            consultorio: newConsultory.toString().toLowerCase(),
            motivo: reason
        };

        try {
            await updateAppointmentRequest(appointmentData);
            cleanForm();
            console.log("Respuesta de actualización:", appointmentData);
            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Cita actualizada con éxito',
                life: 3000,
            });
            cleanForm();
        } catch (error: any) {
            console.error("Error completo:", error);
            console.error("Datos de respuesta:", error.response?.data);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || "Error al actualizar la cita",
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
        setCodAppointment(0);
        setAppointmentsPatient([]);
        setSelectedAppointment(null);
        setNewDate(null);
        setNewTime(null);
        setNewModality("");
        setNewConsultory("");
        setReason("");
    };

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '100%' }} >
            <Toast ref={toast} />

            <form 
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={updateAppointment}
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

                {codAppointment > 0 ? (
                    <div className="col-span-2 pr-2">
                        <div className="grid gap-2 align-middle items-center" style={{ gridTemplateColumns: '35% 65%' }}>
                            <label htmlFor="codAppointment" className="font-bold text-cyan-700">Código de la cita:</label>
                            <InputNumber
                                id="codAppointment"
                                value={codAppointment}
                                placeholder="Código.."
                                readOnly
                            />
                            <label className="font-bold text-cyan-700 w-[35%]">Profesional:</label>
                            <Dropdown
                                value={selectedProfessional}
                                onChange={(e) => setSelectedProfessional(e.value)}
                                options={professionals}
                                optionLabel="name"
                                optionValue="id"
                                placeholder="Selecciona aquí.."
                                className="w-full"
                                required
                            />


                            <label className="font-bold text-cyan-700">Fecha de la cita:</label>
                            <Calendar
                                value={newDate}
                                onChange={(e) => setNewDate(e.value ?? null)}
                                disabledDays={[0, 6]}   // Deshabilita domingos y sábados
                                minDate={new Date()}    // No permitir días anteriores a hoy
                                dateFormat="dd/mm/yy"
                                showIcon
                                placeholder="Selecciona aquí.."
                                className="w-full"
                                required
                            />

                            <label className="font-bold text-cyan-700">Hora de la cita:</label>
                            <Calendar
                                value={newTime}
                                onChange={(e) => setNewTime(e.value ?? null)} 
                                showTime 
                                hourFormat="12"
                                timeOnly  
                                showIcon  
                                icon={() => <i className="pi pi-clock" />}
                                placeholder="Selecciona aquí.."
                                className="w-full"
                                minDate={minHour}
                                maxDate={maxHour}
                                required
                            />

                            <label className="font-bold text-cyan-700">Modalidad:</label>
                            <Dropdown
                                value={newModality}
                                onChange={(e) => setNewModality(e.value)}
                                options={modalidades}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Selecciona aquí.."
                                className="w-full"
                                required
                                aria-label="Selecciona el lugar.."
                            />

                            <label className="font-bold text-cyan-700">Consultorio:</label>
                            <Dropdown
                                value={newConsultory}
                                onChange={(e) => setNewConsultory(e.value)}
                                options={consultorios}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Selecciona aquí.."
                                className="w-full"
                                required
                                aria-label="Selecciona el lugar.."
                            />

                            <label htmlFor="reason" className="font-bold text-cyan-700">Motivo:</label>
                            <InputText
                                id="reason"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Escribe aquí.."
                            />
                        </div>
                    </div>
                ) : (
                    <div className="col-span-2 flex gap-2 align-middle items-center">
                        <label className="w-[35%] font-bold text-cyan-700">Citas activas:</label>
                        <div className="card w-[65%]">
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
                                    <Column field="idCita" header="COD" style={{color: '#49A7CC'}}></Column>
                                    <Column 
                                        field="fechaCita" 
                                        header="Fecha" 
                                        body={(rowData) => formatDate(rowData.fechaCita)}
                                        style={{color: '#49A7CC'}}
                                    ></Column>
                                    <Column field="horaCita" header="Hora" style={{color: '#49A7CC'}}></Column>
                                    <Column field="estado" header="Estado" style={{color: '#49A7CC'}}></Column>
                                    <Column field="profesional" header="Profesional" style={{color: '#49A7CC'}}></Column>
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
                    </div>
                )}
                <div className="col-span-2 flex justify-end">
                    <NavButton type="submit" label="Reprogramar cita" btnFunction={() => console.log('click')} />
                </div>
            </form>
        </Card>
    );
}