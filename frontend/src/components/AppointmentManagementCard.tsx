import React, { useState } from "react";
import { Card } from "primereact/card";
import NavButton from "./NavButton";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";

interface Appointment {
    //id: number;
    //creationDate: Date;
    //clientId: number;
    clientName: string;
    dateAppointment: Date;
    timeAppointment: Date;
    //psychologistId: number;
    psychologistName: string;
    //placeMeetingId: number;
    placeMeeting: string;
    //stateAppointmentId: number;
    stateAppointment: string;
}

export default function AppointmentManagementCard({isActiveProp = true}: {isActiveProp?: boolean}) {
    const [date, setDate] = useState<Date | null>(null);
    const [psychologist, setPsychologist] = useState<string | null>(null);
    const [placeMeeting, setPlaceMeeting] = useState<string | null>(null);
    const [isActive, setIsActive] = useState<boolean>(isActiveProp);

    const professionals = [
        {id: 1, name: "Camila Rodriguez"},
        {id: 2, name: "Oscar Gomez"},
        {id: 3, name: "Hector Martinez"},
    ];

    const places = [
        {id: 1, name: "Consultorio 1"},
        {id: 2, name: "Consultorio 2"},
        {id: 3, name: "Consultorio 3"},
    ];

  return (
    <Card style={{ background: '#f1faee', padding: '0px',  margin:'auto' }} >
        <form
            className='grid gap-2 grid-cols-2'
            aria-describedby="form-description"
            onSubmit={() => {}}
        >
            <label className="h-[30px] font-bold text-cyan-700">Estado de la cita:</label>
            <label>Activa</label>

            <label className="h-[30px] font-bold text-cyan-700">Paciente:</label>
            <label>Camila Bohorquez</label>

            <label className="h-[30px] font-bold text-cyan-700">Fecha de la cita:</label>
            <Calendar value={date} onChange={(e) => setDate(e.value ? e.value : null)} showIcon placeholder="Selecciona aquí.." className="w-full" disabled={!isActive} required/>

            <label className="h-[30px] font-bold text-cyan-700">Hora de la cita:</label>
            <Calendar value={date} onChange={() => {}} showIcon timeOnly icon={() => <i className="pi pi-clock" />} placeholder="Selecciona aquí.." disabled={!isActive} required/>

            <label className="h-[30px] font-bold text-cyan-700">Psicólogo:</label>
            <Dropdown value={psychologist} onChange={(e) => setPsychologist(e.value ? e.value : null)} options={professionals} placeholder="Selecciona un psicólogo" disabled={!isActive} required/>

            <label className="h-[30px] font-bold text-cyan-700">Lugar de la cita:</label>
            <Dropdown value={placeMeeting} onChange={(e) => setPlaceMeeting(e.value ? e.value : null)} options={places} placeholder="Selecciona un lugar" disabled={!isActive} required/>

            <div className="col-span-2 flex justify-end gap-4 mt-6">
                <NavButton type="submit" label="Asignar cita" btnFunction={() => {}} />
                <NavButton type="button" label="Volver" btnFunction={() => {}} />
            </div>
        </form>
    </Card>
  );
}