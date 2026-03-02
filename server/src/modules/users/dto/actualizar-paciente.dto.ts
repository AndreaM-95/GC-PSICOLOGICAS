import { IsOptional, IsString } from "class-validator";
import { PersonaBaseDto } from "./persona-base.dto";

export class ActualizarPacienteDTO extends PersonaBaseDto{
    @IsString()
    @IsOptional()
    estado?: string;
}