import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateAppointmentDTO } from "./createAppointment.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {
    @ApiProperty({
        description: 'ID de la cita a actualizar',
        example: 12,
        type: Number
    })
    @IsNotEmpty()
    @IsNumber()
    idCita: number;
}