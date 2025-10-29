import type { IMedico, IPaciente, IAdmin } from "./persona"

export interface ICita{
    idCita: number,
    idPaciente: IPaciente,
    idMedico: IMedico,
    idAdministrativo: IAdmin,
    idEstadoCita: IEstadoCita,
    fechaCita: Date,
    horaCita: Date,
    modalidad: string,
    motivo: string
}
export interface IEstadoCita{
    idEstadoCita: number,
    nombreEstado: string,
    descripcion?: string
}