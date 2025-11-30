import { PersonaBaseDto } from "./persona-base.dto";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Especialidad } from "src/common/enums";

export class CrearProfesionalDto extends PersonaBaseDto {
  @IsNotEmpty({ message: 'The professional license number is required'})
  @IsString()
  licencia: string;

  @IsNotEmpty({ message: 'The professional specialization is required'})
  @IsEnum(Especialidad)
  especialidad: Especialidad;
}
