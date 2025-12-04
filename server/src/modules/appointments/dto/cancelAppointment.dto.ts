import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CancelAppointmentDTO {
    @IsNotEmpty()
    @IsNumber()
    idCita: number;

    @IsNotEmpty()
    @IsString()
    motivo: string;
}
