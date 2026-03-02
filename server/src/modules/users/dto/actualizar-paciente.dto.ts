import { IsOptional, IsString } from "class-validator";
import { PersonaBaseDto } from "./persona-base.dto";
import { PartialType } from "@nestjs/swagger";
export class ActualizarPacienteDTO extends PartialType(PersonaBaseDto) {
    @IsString()
    @IsOptional()
    estado?: string;
}