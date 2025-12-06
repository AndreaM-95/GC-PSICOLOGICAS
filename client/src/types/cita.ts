export interface ICita {
    idProfesional: number;
    idPaciente: number;
    fechaCita: string;
    horaCita: string;
    modalidad: 'presencial' | 'virtual';
    consultorio: string;
    motivo: string;
}

export interface IEstadoCita {
    idEstadoCita: number,
    nombreEstado: string,
    descripcion?: string
}

export interface ITodasLasCitas {
    paciente: string;
    totalCitas: number;
    citas: ICitaDetalle[];
}


export interface ICitaDetalle {
    idCita: number;
    fechaCita: string;
    horaCita: string;
    modalidad: "presencial" | "virtual";
    motivo: string;
    consultorio: string;
    estado: "Confirmada" | "Asistida" | "Cancelada" | "No asistida";
    profesional: string;
    administrativo: string;
}

export interface IUpdateAppointment{
    idCita: number,
    idProfesional: number,
    idPaciente: number,
    fechaCita: string;
    horaCita: string;
    modalidad: 'presencial' | 'virtual';
    consultorio: string;
    motivo: string;
}


export interface ICancelarCita {
    idCita: number,
    motivo: string
}