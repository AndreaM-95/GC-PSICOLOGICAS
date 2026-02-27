import type { IHistoriaClinica } from "./historia";

export interface Autorizacion{
  idAutorizacion: number,
  idPaciente: number,
  idMedico: number,
  idHistoria: IHistoriaClinica,
  fechaCreacion: Date,
  horaCreacion: Date,
  fechaExpiracion: Date,
  estadoAutorizacion: string,
  tipoMedicamento: string,
  dosis: string,
  observaciones: string,
}