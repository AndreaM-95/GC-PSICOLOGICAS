import { IsEnum, IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { CrearProfesionalDto } from "./crear-profesional.dto";
import { Especialidad } from "src/common/enums";

export class ActualizarProfesionalDTO extends PartialType(CrearProfesionalDto) {
    @IsOptional()
    @IsString()
    licencia?: string;

    @IsOptional()
    @IsEnum(Especialidad)
    especialidad?: Especialidad;
}