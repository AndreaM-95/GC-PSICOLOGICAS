import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ModalidadCita } from "src/common/enums/ModalidadCita";

export class CreateAppointmentDTO {
    @ApiProperty({
        description: 'ID del profesional con el que se agenda la cita',
        example: 4,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    idProfesional: number;

    @ApiProperty({
        description: 'ID del paciente con el que se agenda la cita',
        example: 4,
        type: Number,
    })
    @IsNotEmpty()
    @IsNumber()
    idPaciente: number;

    @ApiProperty({
        description: 'Fecha de la cita en formato YYYY-MM-DD',
        example: "2024-12-31"
    })
    @IsNotEmpty()
    fechaCita: string;

    @ApiProperty({
        description: 'Hora de la cita en formato HH:mm',
        example: "02:30"
    })
    @IsNotEmpty()
    @IsString()
    horaCita: string;

    @ApiProperty({
        description: 'Modalidad de la cita, puede ser presencial o virtual',
        example: "presencial"
    })
    @IsNotEmpty()
    @IsEnum(ModalidadCita)
    modalidad: ModalidadCita;

    @ApiProperty({
        description: 'Consultorio donde se llevará a cabo la cita, solo si la modalidad es presencial',
        example: "Consultorio 1"
    })
    @IsOptional()
    consultorio?: string;

    @ApiProperty({
        description: 'Razón o motivo de la cita',
        example: 'Consulta inicial para evaluación psicológica'
    })
    @IsOptional()
    motivo?: string;
}
