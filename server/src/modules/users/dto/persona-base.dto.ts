import { IsString, IsEmail, IsNumber, IsDateString, IsEnum, IsNotEmpty, Length, Min, Max } from "class-validator";
import { Genero, Roles } from "src/common/enums";

export class PersonaBaseDto {
    @IsNotEmpty({ message: 'Name is required'})
    @IsString()
    nombres: string;

    @IsNotEmpty({ message: 'Lastname is required'})
    @IsString()
    apellidos: string;

    @IsNotEmpty({ message: 'Type document is required'})
    @IsString()
    tipoDocumento: string;

    @IsNotEmpty()
    @IsString({ message: 'Number document is required'})
    numeroDocumento: string;

    @IsNotEmpty({ message: 'Date of birth is required'})
    @IsDateString({}, { message: 'Birth date must be in format YYYY-MM-DD' })
    @IsString()
    fechaNacimiento: string;

    @IsNotEmpty({ message: 'Gender is required'})
    @IsEnum(Genero)
    genero: Genero;

    @IsNotEmpty({ message: 'City of residence required'})
    @IsString()
    ciudadResidencia: string;

    @IsNotEmpty({ message: 'cellphone number is required'})
    @IsString()
    @Length(10,10, { message: "Phone number must have exactly 10 digits" })
    celular: string;
    
    @IsNotEmpty({ message: 'Email is required'})
    @IsString()
    @IsEmail()
    correo: string;

    @IsNotEmpty({ message: 'EPS required'})
    @IsString()
    eps: string;

    @IsNotEmpty({ message: 'The name of the emergency contact is required'})
    @IsString()
    nombresContactoEmergencia: string;

    @IsNotEmpty({ message: 'The emergency contact number is required'})
    @IsString()
    @Length(10,10, { message: "Phone number must have exactly 10 digits" })
    celularContactoEmergencia: string;

    @IsNotEmpty({ message: 'Password is required'})
    @IsString()
    @Length(6, 10, { message: 'The password must be al least 6 characters long and no more than 10 characters'})
    contrasena: string;

    // @IsNotEmpty({ message: 'Rol is required'})
    // @IsEnum(Roles)
    // rol: Roles;
}
