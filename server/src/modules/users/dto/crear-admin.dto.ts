import { IsString } from "class-validator";
import { PersonaBaseDto } from "./persona-base.dto";

export class CrearAdminDto extends PersonaBaseDto {
  @IsString()
  cargo: string; // Ejemplo: "Administrador General"
}
