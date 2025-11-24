import React, { useState } from "react";
import { Card } from "primereact/card";
import NavButton from "./NavButton";
import { Calendar } from "primereact/calendar";
import InputDropdown from "./InputDropdown";

export default function AppointmentManagementCard({isActiveProp = true}: {isActiveProp?: boolean}) {
    const [date, setDate] = useState<Date>();
    const [psychologist, setPsychologist] = useState<string>("");
    const [placeMeeting, setPlaceMeeting] = useState<string>("");
    const [isActive] = useState<boolean>(isActiveProp);

    //TODO: Limitar citas de lunes a viernes
    //TODO: Limitar citas en horarios de 8 a 5

    //TODO: Traer los medicos de BD
    const professionals = [
        {id: 1, name: "Camila Rodriguez"},
        {id: 2, name: "Oscar Gomez"},
        {id: 3, name: "Hector Martinez"},
    ];

    /**
     * @description Diccionario de objetos del lugar de la cita
     */
    const places = [
        {id: 1, name: "Presencial - Consultorio 1"},
        {id: 2, name: "Presencial - Consultorio 2"},
        {id: 3, name: "Virtual"},
    ];


  return (
    <Card style={{ background: '#f1faee', padding: '0px',  margin:'auto' }} >
        <form
            className='grid gap-2 grid-cols-2 align-middle'
            aria-describedby="form-description"
            onSubmit={() => {}}
        >
            <label className="font-bold text-cyan-700 content-center">Paciente:</label>
            <label className="font-bold pb-[7px]">Camila Bohorquez</label>

            <label className="font-bold text-cyan-700 content-center">Fecha de la cita:</label>
            <Calendar value={date} onChange={(e) => setDate(e.value ? e.value: new Date())} showIcon placeholder="Selecciona aquí.." className="w-full" disabled={!isActive} required/>

            <label className="font-bold text-cyan-700 content-center">Hora de la cita:</label>
            <Calendar value={date} onChange={() => {}} showIcon timeOnly icon={() => <i className="pi pi-clock" />} placeholder="Selecciona aquí.." disabled={!isActive} required/>

            <label className="font-bold text-cyan-700 content-center">Psicólogo:</label>
            <InputDropdown
                dataDrops={professionals}
                textField="Selecciona al profesional"
                isVisible = {true}
                value={psychologist}
                onChange={setPsychologist}
            />

            <label className="font-bold text-cyan-700 content-center">Lugar de la cita:</label>
            <InputDropdown
                dataDrops={places}
                textField="Selecciona al profesional"
                isVisible = {true}
                value={placeMeeting}
                onChange={setPlaceMeeting}
            />

            <div className="col-span-2 flex justify-end gap-4 mt-6">
                <NavButton type="submit" label="Asignar cita" btnFunction={() => {}} />
                <NavButton type="button" label="Volver" btnFunction={() => {}} />
            </div>
        </form>
    </Card>
  );
}