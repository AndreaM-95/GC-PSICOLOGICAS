import { IsDateString, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateUserDTO {
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
    @IsString()
    genero: string;

    @IsNotEmpty({ message: 'City of residence required'})
    @IsString()
    ciudadResidencia: string;

    @IsNotEmpty({ message: 'cellphone number is required'})
    @IsNumber()
    @Min(10)
    @Max(10, { message: "Phone number must have exactly 10 digits" })
    celular: number;

    @IsNotEmpty({ message: 'EPS required'})
    @IsString()
    eps: string;

    @IsNotEmpty({ message: 'The name of the emergency contact is required'})
    @IsString()
    nombresContactoEmergencia: string;

    @IsNotEmpty({ message: 'The emergency contact number is required'})
    @IsNumber()
    @Min(10)
    @Max(10, { message: "Phone number must have exactly 10 digits" })
    celularContactoEmergencia: number;

    @IsNotEmpty({ message: 'Email is required'})
    @IsString()
    correo:string;

    @IsNotEmpty({ message: 'Password is required'})
    @IsString()
    @Length(6, 10, { message: 'The password must be al least 6 characters long and no more than 10 characters'})
    constrasena:string;
}