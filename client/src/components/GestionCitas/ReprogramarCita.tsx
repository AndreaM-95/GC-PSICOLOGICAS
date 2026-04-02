import { useState } from "react";
import { InputText } from "primereact/inputtext";
import NavButton from "@/components/NavButton";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Toast } from 'primereact/toast';
import { patientAppointmentsRequest, updateAppointmentRequest } from "@/services/appointments.service";
import { AutoComplete } from "primereact/autocomplete";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type { IUpdateAppointment } from "../../types";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { UseInputValidation } from "@/utils/InputValidation";
import { useAppToast } from "@/hooks/useAppToast";
import { constantes } from "@/utils/constantes";
import { usePatientSearch } from "@/hooks/usePatientSearch";
import { usePatientsData } from "@/hooks/usePatientsData";
import { useProfessionalData } from "@/hooks/useProfessionalData";

export default function UpdateAppointment() {
    const { toast, showMessage } = useAppToast();
    const [documentPatient, setDocumentPatient] = useState("");
    const [appointmentsPatient, setAppointmentsPatient] = useState<any[]>([]);
    const [codAppointment, setCodAppointment] = useState(0);
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
    const { patients } = usePatientsData(showMessage); // Cargar pacientes al montar el componente
    const { filteredPatients, searchPatient } = usePatientSearch(patients);
    const { professionals } = useProfessionalData(showMessage);
    const { modalidades, consultorios } = constantes();
    
    // Crear horas mínimas y máximas
    const minHour = new Date();
    minHour.setHours(8, 0, 0, 0); // 8:00 AM
    const maxHour = new Date();
    maxHour.setHours(17, 0, 0, 0); // 5:00 PM

    
    /**
     * @description Selección del paciente y visualización de su nombre en el input
     * @param e 
     */
    const onPatientSelect = (e: { value: any }) => {
        cleanForm();
        const selected = e.value;
        setSelectedPatient(selected);
        setPatient(`${selected.nombres} ${selected.apellidos}`);
        setDocumentPatient(selected.numeroDocumento);
        loadPatientAppointments(selected.numeroDocumento);
    };

    /**
     * @description Encargado de listar las citas del paciente seleccionado
     * @param numeroDocumento número del documento del paciente
     */
    const loadPatientAppointments = async (document: string) => {
        try {
            const response = await patientAppointmentsRequest(parseInt(document));
            const activeAppointments = response.citas.filter((app: any) => app.estado === "Confirmada");
            setAppointmentsPatient(activeAppointments);

        } catch (error: any) {
            console.error("Error cargando citas:", error);
            setAppointmentsPatient([]);
            const backendMessage =
                error.response?.data?.message?.message ||
                "Error inesperado al crear la cita.";

            showMessage("error", backendMessage);
        }
    };

    const professionalsFormatted = professionals.map((p) => ({
        ...p,
        fullName: `${p.nombres} ${p.apellidos} -  ${p.especialidad}`
    }));

    /**
     * @description Selecciona la cita que se modificará tomando sus campos actuales
     * @param appointment La cita con todos los datos solicitados
     */
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

    /**
     * @description Cambia los datos generales de la cita ya creada
     * @param e Evento del envío del formulario
     * @returns 
     */
    const updateAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPatient || !codAppointment || !newDate || !newTime || !newModality || !newConsultory || !selectedProfessional) {
            showMessage("error", "Todos los campos son obligarorios.");
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
            showMessage("success", "Cita actualizada con éxito");
            cleanForm();
        } catch (error: any) {
            console.error("Datos de respuesta:", error.response?.data);
            console.error(error.response?.data?.message);
            showMessage("error", "Error al actualizar la cita.");
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
                style={{ gridTemplateColumns: '25% 75%' }}
                onSubmit={updateAppointment}
                >
                <AutoComplete
                    id="documentPatient"
                    value={documentPatient}
                    suggestions={filteredPatients}
                    completeMethod={searchPatient}
                    field="numeroDocumento"
                    onChange={(e) => setDocumentPatient(e.value)}
                    onSelect={onPatientSelect}
                    placeholder="Ingrese documento del paciente"
                    aria-label="Buscar paciente por documento"
                    dropdown
                    className="col-span-2"
                />
                <Divider className="col-span-2"/>

                <div className="col-span-2 gap-2 w-full flex align-middle">
                    <label htmlFor="patient" className="font-bold text-cyan-700 w-[35%]">Paciente seleccionado:</label>
                    <InputText
                        id="patient"
                        value={patient}
                        placeholder="Nombre del paciente (Sólo lectura)"
                        className="w-[65%]"
                        readOnly
                    />
                </div>

                {codAppointment > 0 ? (
                    <div className="col-span-2 pr-2 w-full">
                        <div className="grid gap-2 align-middle items-center w-full" style={{ gridTemplateColumns: '35% 65%' }}>
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
                                options={professionalsFormatted}
                                optionLabel="fullName"
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
                                stepMinute={30} 
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
                                onChange={(e) => {
                                    setNewModality(e.value);
                                    if (e.value === "Virtual") setNewConsultory(e.value="No aplica");
                                }}
                                options={modalidades}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Selecciona aquí.."
                                className="w-full"
                                required
                                aria-label="Selecciona el lugar.."
                            />

                            {newModality === "Presencial" && (
                                <>
                                    <label className="font-bold text-cyan-700">Consultorio:</label>
                                    <Dropdown
                                        value={newConsultory}
                                        onChange={(e) => setNewConsultory(e.value)}
                                        options={consultorios}
                                        optionLabel="name"
                                        optionValue="name"
                                        placeholder="Selecciona aquí.."
                                        className="w-full"
                                        required={newModality === "Presencial"}
                                        aria-label="Selecciona el consultorio"
                                    />
                                </>
                            )}

                            <label htmlFor="reason" className="font-bold text-cyan-700">Motivo:</label>
                            <InputText
                                id="reason"
                                value={reason}
                                onChange={UseInputValidation(setReason, "letters")}
                                placeholder="Escribe aquí.."
                                required
                            />
                        </div>
                    </div>
                ) : (
                    <div className="col-span-2 flex align-middle items-center">
                        <label className="w-[35%] font-bold text-cyan-700">Citas activas:</label>
                        <div className="card w-full">
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
                                <Card className="text-center w-full">
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
