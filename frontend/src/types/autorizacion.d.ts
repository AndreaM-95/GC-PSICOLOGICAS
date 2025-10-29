import type { IHistoriaClinica } from "./historia";
import type { IMedico, IPaciente } from "./persona";

export interface Autorizacion{
  idAutorizacion: number,
  idPaciente: IPaciente,
  idMedico: IMedico,
  idHistoria: IHistoriaClinica,
  fechaCreacion: Date,
  horaCreacion: Date,
  fechaExpiracion: Date,
  estadoAutorizacion: string,
  tipoMedicamento: string,
  dosis: string,
  observaciones: string,
}