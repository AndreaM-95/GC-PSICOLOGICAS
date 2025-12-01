import { IsNotEmpty, IsString } from "class-validator";
import { PersonaBaseDto } from "./persona-base.dto";

export class CrearAdminDto extends PersonaBaseDto {
  @IsNotEmpty({ message: 'The position is required'})
  @IsString()
  cargo: string; // Ejemplo: "Administrador General"
}
