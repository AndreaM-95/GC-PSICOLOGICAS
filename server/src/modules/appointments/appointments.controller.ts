import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';
import { UpdateAppointmentDTO } from './dto/updateAppointment.dto';
import { CancelAppointmentDTO } from './dto/cancelAppointment.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Roles as Rol } from 'src/common/enums/Roles';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService ) {}

    //@Roles(Rol.ADMINISTRATIVO)
    @Post()
    adminCreateAppointment(@Request() req, @Body() body: CreateAppointmentDTO) {
        return this.appointmentService.adminCreateAppointment(req.user, body);
    }

    //@Roles(Rol.ADMINISTRATIVO)
    @Get('/patient/:document')
    adminListAppointments(@Param('document') document:string) {
        return this.appointmentService.adminListAppointments(document);
    }

    //@Roles(Rol.ADMINISTRATIVO)
    @Put('/patient')
    adminRescheduleAppointment(@Request() req, @Body() body: UpdateAppointmentDTO) {
        return this.appointmentService.adminRescheduleAppointment(req.user, body);
    }

    //@Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Patch("cancel")
    cancelAppointment(@Body() dto: CancelAppointmentDTO) {
        return this.appointmentService.cancelAppointment(dto);
    }
}
