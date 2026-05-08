import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CancelAppointmentDTO {
    @ApiProperty({
        description: 'ID de la cita a cancelar',
        example: 12,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    idCita: number;

    @ApiProperty({
        description: 'Razón o motivo de la cancelación',
        example: 'El paciente no puede asistir a la cita programada.'
    })
    @IsNotEmpty()
    @IsString()
    motivo: string;
}
