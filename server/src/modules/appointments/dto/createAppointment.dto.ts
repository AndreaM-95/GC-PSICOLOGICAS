import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ModalidadCita } from "../../../common/enums";

export class CreateAppointmentDTO {
    @IsNotEmpty()
    @IsNumber()
    idProfesional: number;

    @IsNotEmpty()
    @IsNumber()
    idPaciente: number;

    @IsNotEmpty()
    fechaCita: string;

    @IsNotEmpty()
    @IsString()
    horaCita: string;

    @IsNotEmpty()
    @IsEnum(ModalidadCita)
    modalidad: ModalidadCita;

    @IsOptional()
    consultorio?: string;

    @IsOptional()
    motivo?: string;
}
