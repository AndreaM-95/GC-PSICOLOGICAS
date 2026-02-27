import { Calendar } from "primereact/calendar";
import { Paginator } from 'primereact/paginator';
import { useState } from "react";

import Navbar from "@/components/Navbar";
import { EstadoPersona, type IPersona, Generos, type IAdmin, type RolPersona, type IPaciente, type ICita, type EstadosCita, type IProfesional, rolPersona, TipoDocumento, estadoPersona } from "@/types";

// const DataPersons: IPersona[] = [
//     {
//         idPersona: 1,
//         nombres: "Juan",
//         apellidos: "Perez",
//         tipoDocumento: TipoDocumento.CC,
//         numeroDocumento: "1110566880",
//         fechaNacimiento: new Date("1995-11-07"),
//         genero: Generos.MASCULINO,
//         ciudadResidencia: "Bogotá",
//         celular: 3105256532,
//         correo: "jp@gmail.com",
//         eps: "Sanitas",
//         nombresContactoEmergencia: "Olga",
//         celularContactoEmergencia: 3057889897,
//         contrasena: "string123",
//         idEstado: estadoPersona.ACTIVO
//     },
//     {
//         idPersona: 2,
//         nombres: "Camilo",
//         apellidos: "Lopez",
//         tipoDocumento: TipoDocumento.CC,
//         numeroDocumento: "1110566880",
//         fechaNacimiento: new Date("1995-11-07"),
//         genero: Generos.MASCULINO,
//         ciudadResidencia: "Bogotá",
//         celular: 3105256532,
//         correo: "jp@gmail.com",
//         eps: "Sanitas",
//         nombresContactoEmergencia: "Luz",
//         celularContactoEmergencia: 3057889897,
//         contrasena: "string123",
//         idEstado: estadoPersona.ACTIVO
//     },
//     {
//         idPersona: 3,
//         nombres: "Pedro",
//         apellidos: "Gonzales",
//         tipoDocumento: TipoDocumento.CC,
//         numeroDocumento: "1110566880",
//         fechaNacimiento: new Date("1995-11-07"),
//         genero: Generos.MASCULINO,
//         ciudadResidencia: "Bogotá",
//         celular: 3105256532,
//         correo: "jp@gmail.com",
//         eps: "Sanitas",
//         nombresContactoEmergencia: "Maria",
//         celularContactoEmergencia: 3057889897,
//         contrasena: "string123",
//         idEstado: estadoPersona.ACTIVO
//     },
//     {
//         idPersona: 4, //Medico
//         nombres: "Camilo",
//         apellidos: "Rodriguez",
//         tipoDocumento: TipoDocumento.CC,
//         numeroDocumento: "1110566880",
//         fechaNacimiento: new Date("1995-11-07"),
//         genero: Generos.MASCULINO,
//         ciudadResidencia: "Bogotá",
//         celular: 3105256532,
//         correo: "jp@gmail.com",
//         eps: "Sanitas",
//         nombresContactoEmergencia: "Olga",
//         celularContactoEmergencia: 3057889897,
//         contrasena: "string123",
//         idEstado: estadoPersona.ACTIVO
//     },
//     {
//         idPersona: 5, //admin
//         nombres: "Maria",
//         apellidos: "Cruz",
//         tipoDocumento: TipoDocumento.CC,
//         numeroDocumento: "1110566880",
//         fechaNacimiento: new Date("1995-11-07"),
//         genero: Generos.MASCULINO,
//         ciudadResidencia: "Bogotá",
//         celular: 3105256532,
//         correo: "jp@gmail.com",
//         eps: "Sanitas",
//         nombresContactoEmergencia: "Olga",
//         celularContactoEmergencia: 3057889897,
//         contrasena: "string123",
//         idEstado: estadoPersona.ACTIVO
//     }
// ]

// const DataADMIN: IAdmin[]= [{ 
//     idAdministrativo: 1,
//     idPersona: 4, // Maria Cruz - admin
//     cargo: "Administrador",
//     rol: rolPersona.ADMIN
// }]

// const DataMedico: IProfesional[]=[{

//     idPersona: 3,
//     nombres: "Camilo",
//     apellidos: "rodriguez",
//     tipoDocumento: "CC",
//     numeroDocumento: "1023654877"
// }]

// const DataPatiente: IPaciente[]=[
//     {
//         idPersona: 0, // Juan Perez
//         fechaRegistro: new Date("2025/11/06"),
//         rol: RolPersona.PACIENTE
//     },
//     {
//         idPaciente: 2,
//         idPersona: DataPersons[1], // Camilo Lopez
//         fechaRegistro: new Date("2025/11/06"),
//         rol: RolPersona.PACIENTE
//     },
//     {
//         idPaciente: 3,
//         idPersona: DataPersons[2], // Pedro Gonzales
//         fechaRegistro: new Date("2025/11/06"),
//         rol: RolPersona.PACIENTE
//     }
// ]

// const DataAppointment: ICita[] = [
//     {
//         idCita: 1,
//         idPaciente: DataPatiente[0],
//         idMedico: DataMedico[0],
//         idAdministrativo: DataADMIN[0],
//         idEstadoCita: EstadosCita.CONFIRMADA,
//         fechaCita: new Date("2025-11-06T22:30:00"),  // objeto Date válido
//         horaCita: new Date("2025-11-06T22:30:00"), // solo hora válida (fecha genérica)
//         modalidad: "Virtual",
//         motivo: "Seguimiento"
//     },
//     {
//         idCita: 2,
//         idPaciente: DataPatiente[1],
//         idMedico: DataMedico[0],
//         idAdministrativo: DataADMIN[0],
//         idEstadoCita: EstadosCita.ASISTIDA,
//         fechaCita: new Date("2025-11-06T22:30:00"),  // objeto Date válido
//         horaCita: new Date("2025-11-06T22:30:00"), // solo hora válida (fecha genérica)
//         modalidad: "Virtual",
//         motivo: "Seguimiento"
//     },
//     {
//         idCita: 3,
//         idPaciente: DataPatiente[2],
//         idMedico: DataMedico[0],
//         idAdministrativo: DataADMIN[0],
//         idEstadoCita: EstadosCita.CANCELADA,
//         fechaCita: new Date("2025-11-06T22:30:00"),  // objeto Date válido
//         horaCita: new Date("2025-11-06T22:30:00"), // solo hora válida (fecha genérica)
//         modalidad: "Virtual",
//         motivo: "Seguimiento"
//     },
//     {
//         idCita: 4,
//         idPaciente: DataPatiente[2],
//         idMedico: DataMedico[0],
//         idAdministrativo: DataADMIN[0],
//         idEstadoCita: EstadosCita.NOASISTIDA,
//         fechaCita: new Date("2025-11-06T22:30:00"),  // objeto Date válido
//         horaCita: new Date("2025-11-06T22:30:00"), // solo hora válida (fecha genérica)
//         modalidad: "Presencial",
//         motivo: "Seguimiento"
//     }
// ];

export default function ListDoctorAppointments() {
    //TODO: Agregar el nombre del doctor desde la API
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);

    const onPageChange = (event: { first: number; rows: number }) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const fechayhora = new Date().toLocaleDateString('es-CO', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'America/Bogota'
    }) + ' - ' + new Date().toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Bogota'
    });

    return (
        <div>
            <Navbar />
            <header className="m-auto w-3/4">
                <h3 className="text-cyan-700 text-[16px] italic mx-auto my-4 text-end">{fechayhora}</h3>
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Citas asignadas</h1>
                {/* <h2 className="text-cyan-700 font-bold text-lg mx-auto">Profesional: {DataPersons[3].nombres} {DataPersons[3].apellidos}</h2> */}
            </header>
            
            <section className="flex flex-col align-middle">
                <div className="m-auto w-3/4 flex justify-end">
                    <Calendar id="buttondisplay" placeholder='Filtra por fecha aquí..' showIcon />
                </div>

                {/* <map name="DataAppointment">
                    <div className="w-3/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto my-8">
                        {DataAppointment.map((item, index) => (
                            <AppointmentCard key={index} {...item} />
                        ))}
                    </div>
                </map> */}

                <div className="card">
                    <Paginator first={first} rows={rows} totalRecords={120} rowsPerPageOptions={[5, 10, 20]} onPageChange={onPageChange} />
                </div>
            </section>
        </div>
    );
}