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

export default function CreateAppointment() {
    const toast = useRef<Toast>(null);

    // Estados del formulario
    const [selectedPatient, setSelectedPatient] = useState<string | number>("");
    const [selectedProfessional, setSelectedProfessional] = useState<string | number>("");
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [placeMeeting, setPlaceMeeting] = useState<string>("");
    const [spaceMeeting, setSpaceMeeting] = useState<string>("");
    const [reason, setReason] = useState<string>("");

    // Estados para BD
    const [patients, setPatients] = useState<any[]>([]);
    const [professionals, setProfessionals] = useState<any[]>([]);

    // Crear horas mínimas y máximas
    const minHour = new Date();
    minHour.setHours(8, 0, 0, 0); // 8:00 AM
    const maxHour = new Date();
    maxHour.setHours(17, 0, 0, 0); // 5:00 PM

    // --- Cargar pacientes y profesionales desde la API ---
    useEffect(() => {
        async function loadData() {
            try {
                const profs = await getProfessionals();
                const pats = await getPatients();

                setProfessionals(
                    profs.map((p: any) => ({
                        id: p.profesional.idProfesional,
                        name: `${p.nombres} ${p.apellidos}`,
                        especialidad: p.profesional?.especialidad ?? "N/A",
                    }))
                );

                setPatients(
                    pats.map((p: any) => ({
                        id: p.idPersona,
                        name: `${p.nombres} ${p.apellidos}`,
                    }))
                );
            } catch (err) {
                console.error("Error cargando datos:", err);
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


    // --- Enviar cita al backend ---
    const createAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación previa
        if (!selectedProfessional || !date || !time || !placeMeeting) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Todos los campos requeridos deben estar completos',
                life: 3000
            });
            return;
        }

        const newAppointment: ICita = {
            idProfesional: Number(selectedProfessional),
            idPaciente: typeof selectedPatient === 'string' ? Number(selectedPatient) : selectedPatient,
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
        setDate(null);
        setTime(null);
        setPlaceMeeting("");
        setSpaceMeeting("");
        setReason("");
    };

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto' }} >
            <Toast ref={toast} />
            <form
                className="grid gap-2 grid-cols-2 align-middle items-center"
                onSubmit={createAppointment}
            >
                <label className="font-bold text-cyan-700">Paciente:</label>
                <Dropdown
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.value)}
                    options={patients}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona un paciente.."
                    className="w-full"
                    required
                    aria-label={'Selecciona un paciente..'}
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
