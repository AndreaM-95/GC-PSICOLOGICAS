import React from 'react';
import '../App.css'
import 'primeicons/primeicons.css';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';


interface Appointment {
    id: number;
    stateAppointmentId: number;
    stateAppointment: string;
    date: string;
    time: string;
    psychologistId: number;
    psychologistName: string;
    clientId: number;
    clientName: string;
    sessionType: string;
    placeMeetingId: number;
    placeMeeting: string;
    timeAppointment: string;
}

export default function AppointmentCard({ appointment }: { appointment: Appointment }) {
    const appointmentFields = [
        { label: 'Fecha', value: `${appointment.date} | ${appointment.time}` },
        { label: 'Psicólogo', value: appointment.psychologistName },
        { label: 'Paciente', value: appointment.clientName },
        { label: 'Tipo de sesión', value: appointment.sessionType },
        { label: 'Lugar de la cita', value: appointment.placeMeeting },
        { label: 'Duración', value: appointment.timeAppointment },
    ];

    const isDisabled = appointment.stateAppointment !== "Confirmada"; // true si NO está confirmada

    const StateAppointmentColor = (state: string) => {
        switch (state) {
            case "Confirmada":
                return "success";
            case "Asistida":
                return "info";
            case "Cancelada":
                return "danger";
            default:
                return "warning";
        }
    }

    const rescheduleTheAppointment = () => {
        if (!isDisabled) {
            console.log("Historial de la cita:", appointment.id);
        }
    };

    const cancelAppointment = () => {
        if (!isDisabled) {
            console.log("Cancelar cita:", appointment.id);
        }
    };

    return (
        <Card
            style={{ background: '#f1faee', padding: '0px' }}
        >
            <div className="flex flex-wrap p-0">
                <Tag severity={StateAppointmentColor(appointment.stateAppointment)} value={appointment.stateAppointment} className='w-4/12'></Tag>
                <div className='flex justify-end gap-2 w-[calc(100%-33.33%)]'>
                    <Button icon="pi pi-history" disabled={isDisabled} aria-label="Filter" onClick={rescheduleTheAppointment} style={{ width: '2rem', height: '2rem' }} />

                    <Button icon="pi pi-times" disabled={isDisabled} aria-label="Filter" onClick={cancelAppointment} style={{ width: '2rem', height: '2rem' }} />
                </div>
            </div>

            <Divider />
            <div className="grid grid-cols-[40%_60%] gap-1">
                {appointmentFields.map((field, index) => (
                    <React.Fragment key={index}>
                    <label className="text-cyan-700 w-full font-bold mb-2 text-sm content-center">{field.label}</label>
                    <label className="text-cyan-700 w-full mb-2 text-sm content-center">{field.value}</label>
                    </React.Fragment>
                ))}
            </div>
        </Card>

    )
}
        