import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';
import { UpdateAppointmentDTO } from './dto/updateAppointment.dto';
import { CancelAppointmentDTO } from './dto/cancelAppointment.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Roles as Rol } from 'src/common/enums/Roles';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Módulo de citas')
@ApiBearerAuth()
@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService ) {}

    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Post()
    @ApiOperation({ summary: 'Administrativo o paciente crea una cita' })
    @ApiResponse({ status: 201, description: 'Objeto con los datos de la cita.' })
    @ApiResponse({ status: 400, description: 'El paciente ya tiene una cita activa.' })
    @ApiResponse({ status: 404, description: 'Administrativo, profesional o paciente no encontrado.' })
    @ApiResponse({ status: 400, description: 'Fecha u hora fuera del rango permitido.' })
    adminCreateAppointment(@Request() req, @Body() body: CreateAppointmentDTO) {
        return this.appointmentService.adminCreateAppointment(req.user, body);
    }

    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Get('/patients/:document')
    @ApiOperation({ summary: 'Listado del historial de citas' })
    @ApiResponse({ status: 200, description: 'Información del listado de citas de un paciente.' })
    @ApiResponse({ status: 404, description: 'El paciente no fue encontrado.' })
    listAppointments(@Param('document') document:string) {
        return this.appointmentService.listAppointments(document);
    }

    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Get('/patient/:document')
    @ApiOperation({ summary: 'Listado de las citas activas del paciente' })
    @ApiResponse({ status: 200, description: 'Listado de citas activas del paciente.' })
    @ApiResponse({ status: 404, description: 'El paciente no fue encontrado o no tiene citas activas.' })
    adminListAppointments(@Param('document') document:string) {
        return this.appointmentService.adminListAppointments(document);
    }

    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Put('update')
    @ApiOperation({ summary: 'Reprogramar una cita' })
    @ApiResponse({ status: 201, description: 'Cita reprogramada.' })
    @ApiResponse({ status: 403, description: 'Sólo los administrativos pueden reprogramar citas.' })
    @ApiResponse({ status: 404, description: 'La cita no existe.' })
    @ApiResponse({ status: 404, description: 'Profesional o paciente no encontrado.' })
    adminRescheduleAppointment(@Request() req, @Body() body: UpdateAppointmentDTO) {
        return this.appointmentService.adminRescheduleAppointment(req.user, body);
    }

    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Patch("cancel")
    @ApiOperation({ summary: 'Cancelar una cita activa' })
    @ApiResponse({ status: 201, description: 'Cita cancelada exitosamente.' })
    @ApiResponse({ status: 404, description: 'La cita ya está cancelada.' })
    cancelAppointment(@Request() req, @Body() dto: CancelAppointmentDTO) {
        return this.appointmentService.cancelAppointment(req.user, dto);
    }
}
