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