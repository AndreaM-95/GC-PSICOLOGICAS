import type { IMedico, IPaciente } from "./persona";

export interface IHistoriaClinica{
  idHistoria: number,
  idPaciente: IPaciente,
  idMedico: IMedico,
  fechaRegistro: Date,
  horaRegistro: Date,
  motivo: string,
  antecedentesMedicos: string,
  antecedentesFamiliares: string,
  antecedentesPsicologicos: string,
  usoMedicamentos: string,
  animo: string,
  escalaRiesgo: number,
  observaciones: string,
  tipoIntervencion: string,
  frecuenciaSesiones: string
}