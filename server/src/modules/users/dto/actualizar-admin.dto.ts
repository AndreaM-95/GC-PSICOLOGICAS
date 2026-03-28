import { IsOptional, IsString } from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { CrearAdminDto } from "./crear-admin.dto";

export class ActualizarAdminDTO extends PartialType(CrearAdminDto) {
    @IsOptional()
    @IsString()
    cargo?: string; // Ejemplo: "Administrador"
}