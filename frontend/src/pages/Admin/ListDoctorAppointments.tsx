import { Calendar } from "primereact/calendar";
import AppointmentCard from "../../components/AppointmentCard";
import Navbar from "../../components/Navbar"
import { Paginator } from 'primereact/paginator';
import { useState } from "react";

const DataAppointment = [
    {
        id: 1,
        stateAppointmentId: 1,
        stateAppointment: "Confirmada",
        date: "2023-03-15",
        time: "10:00 am",
        psychologistId: 1,
        psychologistName: "Camilo Rodríguez",
        clientId: 1,
        clientName: "Juan Pérez",
        sessionType: "Individual",
        placeMeetingId: 1,
        placeMeeting: "Virtual",
        timeAppointment: "1 hora"
    },
    {
        id: 2,
        stateAppointmentId: 1,
        stateAppointment: "Asistida",
        date: "2023-03-16",
        time: "11:00 am",
        psychologistId: 1,
        psychologistName: "Camilo Rodríguez",
        clientId: 2,
        clientName: "María López",
        sessionType: "Individual",
        placeMeetingId: 1,
        placeMeeting: "Virtual",
        timeAppointment: "1 hora"
    },
    {
        id: 3,
        stateAppointmentId: 1,
        stateAppointment: "Cancelada",
        date: "2023-03-17",
        time: "12:00 pm",
        psychologistId: 1,
        psychologistName: "Camilo Rodríguez",
        clientId: 3,
        clientName: "Pedro González",
        sessionType: "Individual",
        placeMeetingId: 1,
        placeMeeting: "Virtual",
        timeAppointment: "1 hora"
    }
];

export default function ListDoctorAppointments() {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    //TODO: Agregar el nombre del doctor desde la API
    return (
        <div>
            <Navbar />
            <div className="m-auto w-3/4">
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Citas asignadas</h1>
                <h3 className="text-cyan-700 font-bold text-lg mx-auto">Profesional: Camilo Rodríguez</h3>
            </div>
            <div className="m-auto w-3/4 flex justify-end">
                <Calendar id="buttondisplay" placeholder='Filtra por fecha aquí..' showIcon />
            </div>

            <map name="DataAppointment">
                <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto my-8">
                    {DataAppointment.map((item, index) => (
                        <AppointmentCard key={index} appointment={item} />
                    ))}
                </div>
            </map>

            <div className="card">
                <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[5, 10, 20]} onPageChange={onPageChange} />
            </div>
        </div>
    );
}