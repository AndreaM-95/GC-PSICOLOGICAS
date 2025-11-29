import type { IMedico, IPaciente, IAdmin } from "./persona"
import type { EstadosCita } from "./enums"

export interface ICita {
    idCita: number,
    idPaciente: IPaciente,
    idMedico: IMedico,
    idAdministrativo: IAdmin,
    idEstadoCita: EstadosCita,
    fechaCita: Date,
    horaCita: Date,
    modalidad: string,
    motivo: string
}
export interface IEstadoCita {
    idEstadoCita: number,
    nombreEstado: string,
    descripcion?: string
}