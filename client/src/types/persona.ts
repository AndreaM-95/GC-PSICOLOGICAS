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
    idPersona: number,
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


// --- CREACIÓN DE PERFILES
export interface ICrearAdmin{
  nombres: string,
  apellidos: string,
  tipoDocumento: string,
  numeroDocumento: string,
  fechaNacimiento: string,
  genero: string,
  ciudadResidencia: string,
  celular: string,
  correo: string,
  eps: string,
  nombresContactoEmergencia: string,
  celularContactoEmergencia: string,
  contrasena: string,
  cargo: string
}

export interface ICrearProfesional{
  nombres: string,
  apellidos: string,
  tipoDocumento: string,
  numeroDocumento: string,
  fechaNacimiento: string,
  genero: string,
  ciudadResidencia: string,
  celular: string,
  correo: string,
  eps: string,
  nombresContactoEmergencia: string,
  celularContactoEmergencia: string,
  contrasena: string,
  licencia: string,
  especialidad: string
}

export interface ICrearPaciente{
  nombres: string,
  apellidos: string,
  tipoDocumento: string,
  numeroDocumento: string,
  fechaNacimiento: string,
  genero: string,
  ciudadResidencia: string,
  celular: number,
  correo: string,
  eps: string,
  nombresContactoEmergencia: string,
  celularContactoEmergencia: number,
  contrasena: string
}

//ACTUALIZACIÓN DE PERFILES
export interface IActualizarPersona{
  nombres?: string,
  apellidos?: string,
  tipoDocumento?: string,
  numeroDocumento?: string,
  fechaNacimiento?: Date,
  genero?: string,
  ciudadResidencia?: string,
  celular?: number,
  correo?: string,
  eps?: string,
  nombresContactoEmergencia?: string,
  celularContactoEmergencia?: number,
  contrasena?: string,
  estado?: string
}