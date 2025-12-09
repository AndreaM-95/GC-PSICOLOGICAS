import React, { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { getPatients, getProfessionals } from "../../services/user.service";
import { createAppointmentRequest } from "../../services/appointments.service";
import type { ICita } from "../../types";
import NavButton from "../NavButton";
import { AutoComplete } from "primereact/autocomplete";
import { Divider } from "primereact/divider";

export default function CreateAppointment() {
    const toast = useRef<Toast>(null);

    // Estados del formulario
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<string | number>("");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [placeMeeting, setPlaceMeeting] = useState<string>("");
    const [spaceMeeting, setSpaceMeeting] = useState<string>("");
    const [reason, setReason] = useState<string>("");

    //Búsqueda y selección de pacientes
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);
    const [patient, setPatient] = useState("");
    const [documentPatient, setDocumentPatient] = useState("");

    // Estados para BD
    const [patients, setPatients] = useState<any[]>([]);
    const [professionals, setProfessionals] = useState<any[]>([]);

    // Crear horas mínimas y máximas
    const minHour = new Date();
    minHour.setHours(8, 0, 0, 0); // 8:00 AM
    const maxHour = new Date();
    maxHour.setHours(17, 0, 0, 0); // 5:00 PM

    // Cargar pacientes y profesionales al montar el componente
    useEffect(() => {
        async function loadData() {
            try {
                const pats = await getPatients();
                const profs = await getProfessionals();

                setPatients(
                    pats.map((p: any) => ({
                        id: p.idPersona,
                        document: p.numeroDocumento ?? "",
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

    const modalidades = [
        { id: 1, name: "Presencial" },
        { id: 2, name: "Virtual" }
    ];

    const consultorios = [
        { id: 1, name: "Consultorio 1" },
        { id: 2, name: "Consultorio 2" },
        { id: 3, name: "No aplica" }
    ];

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
        setPatient(selected.name ?? "");
        setDocumentPatient(selected.document);
    };

    // --- Enviar cita al backend ---
    const createAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación previa
        if (!patient || !selectedProfessional || !date || !time || !placeMeeting) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Todos los campos son obligatorios.',
                life: 3000
            });
            return;
        }

        const newAppointment: ICita = {
            idProfesional: Number(selectedProfessional),
            idPaciente: selectedPatient.id,
            fechaCita: date.toISOString().split("T")[0],  // YYYY-MM-DD
            horaCita: time.toTimeString().slice(0, 5),   // HH:mm
            modalidad: placeMeeting.toLowerCase() as 'presencial' | 'virtual',
            consultorio: spaceMeeting.toString().toLowerCase(),
            motivo: reason
        };
        
        try {
            await createAppointmentRequest(newAppointment);
            cleanForm();
            console.log("Datos de la cita:", newAppointment);
            toast.current?.show({
                severity:'success',
                summary: 'Éxito',
                detail:'Cita creada con éxito.',
                life: 3000,
            });
        } catch (error: any) {
            console.error("Error completo:", error);
            console.error("Datos de respuesta:", error.response?.data);
            toast.current?.show({
                severity:'error',
                summary: 'Error',
                detail: error.response?.data?.message || "Error al crear cita.",
                life: 3000
            });
        }
    };

    const cleanForm = () => {
        setSelectedProfessional("");
        setSelectedPatient("");
        setPatient("");
        setDocumentPatient("");
        setDate(null);
        setTime(null);
        setPlaceMeeting("");
        setSpaceMeeting("");
        setReason("");
    };

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '100%' }} >
            <Toast ref={toast} />
            <form
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={createAppointment}
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

                <label className="font-bold text-cyan-700">Profesional:</label>
                <Dropdown
                    value={selectedProfessional}
                    onChange={(e) => setSelectedProfessional(e.value)}
                    options={professionals}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    required
                    aria-label={'Selecciona al profesional..'}
                />

                <label className="font-bold text-cyan-700">Fecha de la cita:</label>
                <Calendar
                    value={date}
                    onChange={(e) => setDate(e.value ?? null)}
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
                    value={time}
                    onChange={(e) => setTime(e.value ?? null)} 
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
                    value={placeMeeting}
                    onChange={(e) => setPlaceMeeting(e.value)}
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
                    value={spaceMeeting}
                    onChange={(e) => setSpaceMeeting(e.value)}
                    options={consultorios}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    required
                    aria-label="Selecciona el lugar.."
                />

                <label className="font-bold text-cyan-700">Motivo:</label>
                <InputText placeholder="Escribe aquí.." value={reason} onChange={(e) => setReason(e.target.value)} />

                <div className="col-span-2 flex justify-end">
                    <NavButton type="submit" label="Asignar cita" btnFunction={() => console.log('click')} />
                </div>
            </form>
        </Card>
    );
}
