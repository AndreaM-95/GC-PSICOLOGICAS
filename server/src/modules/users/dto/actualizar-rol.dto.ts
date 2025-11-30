import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { Roles } from "src/common/enums";

export class ActualizarRol {
  @IsNotEmpty({ message: 'The id is required'})
  @IsNumber()
  idUsuario: number;

  @IsNotEmpty({ message: 'The rol is required'})
  @IsEnum(Roles)
  rolUsuario: Roles
}
