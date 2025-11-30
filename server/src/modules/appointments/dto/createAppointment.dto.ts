import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAppointmentDTO{
    @IsNotEmpty({ message: 'Date is required'})
    fechaCreacion: Date;
    
    @IsNotEmpty({ message: 'idAdmin is required'})
    idAdministrativo: number;

    @IsNotEmpty({ message: 'idDoctor is required'})
    idMedico: number;

    @IsNotEmpty({ message: 'idPatient is required'})
    idPaciente: number;

    @IsNotEmpty({ message: 'idState appointment is required'})
    idEstadoCita: number;

    @IsNotEmpty({ message: 'Appoinment date is required'})
    fechaCita: Date;

    @IsNotEmpty({ message: 'Appoinment hour is required'})
    horaCita: Date;
    
    @IsNotEmpty({ message: 'Mode is required'})
    @IsString()
    modalidad:string;

    @IsOptional()
    motivo?: string;
}