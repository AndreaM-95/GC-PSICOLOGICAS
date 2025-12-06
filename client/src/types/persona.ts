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
  idEstado: estadoPersona.ACTIVO
}

export enum estadoPersona{
    ACTIVO = 'activo',
    INACTIVO = 'inactivo',
}

export enum rolPersona{
    ADMIN = 'admin',
    MEDICO = 'medico',
    PACIENTE = 'paciente'
}

export interface IAdmin{
    idAdministrativo: number,
    idPersona: IPersona,
    cargo: string,
    rol: rolPersona.ADMIN
}

export interface IProfesional{
    idPersona: number,
    nombres: string,
    apellidos: string,
    tipoDocumento: string,
    numeroDocumento: string;
}

export interface IPaciente{
    idPersona: number,
    nombres: string,
    apellidos: string,
    tipoDocumento: string,
    numeroDocumento: string;
}