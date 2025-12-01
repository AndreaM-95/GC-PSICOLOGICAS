import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateAppointmentDTO } from "./createAppointment.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdateAppointmentDTO extends PartialType(CreateAppointmentDTO) {
    @IsNotEmpty()
    @IsNumber()
    idCita: number;
}