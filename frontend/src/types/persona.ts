import type { EstadoPersona, RolPersona } from "./enums"

export interface IPersona{
  idPersona: number,
  nombres: string,
  apellidos: string,
  tipoDocumento: string,
  numeroDocumento: string,
  fechaNacimiento: Date,
  genero: string,
  ciudadResidencia: string,
  celular: number,
  correo: string,
  eps: string,
  nombresContactoEmergencia: string,
  celularContactoEmergencia: number,
  contrasena: string,
  idEstado: EstadoPersona
}

export interface IAdmin{
    idAdministrativo: number,
    idPersona: IPersona,
    cargo: string,
    rol: RolPersona
}

export interface IMedico{
    idMedico: number,
    idPersona: IPersona,
    licencia: string,
    especialidad: string,
    rol: RolPersona
}

export interface IPaciente{
    idPaciente: number,
    idPersona: IPersona,
    fechaRegistro: Date,
    rol: RolPersona
}