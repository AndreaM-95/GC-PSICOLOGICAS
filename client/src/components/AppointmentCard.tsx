import React from 'react';
import '../App.css'
import 'primeicons/primeicons.css';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { EstadosCita, type ICita } from '../types';

export default function AppointmentCard( citaMedica: ICita) {
    const appointmentFields = [
        { label: 'Fecha', value: `${citaMedica.fechaCita.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}` },
        { label: 'Hora', value: `${citaMedica.horaCita.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true })}` },
        { label: 'Psicólogo', value: `${citaMedica.idMedico.idPersona.nombres} ${citaMedica.idMedico.idPersona.apellidos}` },
        { label: 'Paciente', value: `${citaMedica.idPaciente.idPersona.nombres} ${citaMedica.idPaciente.idPersona.apellidos}` },
        { label: 'Motivo', value: citaMedica.motivo },
        { label: 'Modalidad', value: citaMedica.modalidad },
        { label: 'Duración', value: "1 hora" },
    ];

    const isDisabled = citaMedica.idEstadoCita !== "Confirmada"; //Si la cita no está confirmada

    //Falta no asistida
    const StateAppointmentColor = (state: EstadosCita) => {
        switch (state) {
            case state = EstadosCita.NOASISTIDA:
                return "warning";
            case  state = EstadosCita.ASISTIDA:
                return "info";
            case  state = EstadosCita.CANCELADA:
                return "danger";
            default:
                return "success";
        }
    }

    const rescheduleTheAppointment = () => {
        if (!isDisabled) {
            console.log("Historial de la cita:", citaMedica.idEstadoCita);
        }
    };

    const cancelAppointment = () => {
        if (!isDisabled) {
            console.log("Cancelar cita:", citaMedica.idEstadoCita);
        }
    };

    return (
        <Card
            style={{ background: '#f1faee', padding: '0px' }}
        >
            <div className="flex flex-wrap p-0">
                <Tag severity={StateAppointmentColor(citaMedica.idEstadoCita as EstadosCita)} value={citaMedica.idEstadoCita} className='w-[40%]'></Tag>
                <div className='flex justify-end gap-2 w-[calc(100%-40%)]'>
                    <Button icon="pi pi-history" disabled={isDisabled} aria-label="Filter" onClick={rescheduleTheAppointment} style={{ width: '2rem', height: '2rem' }} />

                    <Button icon="pi pi-times" disabled={isDisabled} aria-label="Filter" onClick={cancelAppointment} style={{ width: '2rem', height: '2rem' }} />
                </div>
            </div>

            <Divider />
            <div className="grid grid-cols-[40%_60%]">
                {appointmentFields.map((field, index) => (
                    <React.Fragment key={index}>
                    <label className="text-cyan-700 w-full font-bold mb-2 text-[13px] content-center">{field.label}</label>
                    <label className="text-cyan-700 w-full mb-2 text-[13px] content-center">{field.value}</label>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    )
}
        