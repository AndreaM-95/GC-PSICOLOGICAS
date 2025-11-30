import { PersonaBaseDto } from "./persona-base.dto";
import { IsEnum, IsString } from "class-validator";
import { Especialidad } from "src/common/enums";

export class CrearProfesionalDto extends PersonaBaseDto {
  @IsString()
  licencia: string;

  @IsEnum(Especialidad)
  especialidad: Especialidad;
}
