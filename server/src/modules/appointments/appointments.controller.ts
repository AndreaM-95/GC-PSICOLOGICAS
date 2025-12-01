import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';
import { UpdateAppointmentDTO } from './dto/updateAppointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService ) {}

    @Post()
    adminCreateAppointment(@Body() body: CreateAppointmentDTO) {
        return this.appointmentService.adminCreateAppointment(body);
    }

    @Get('/patient/:document')
    adminListAppointments(@Param('document') document:string) {
        return this.appointmentService.adminListAppointments(document);
    }

    @Put('/patient')
    adminRescheduleAppointment(@Body() body: UpdateAppointmentDTO) {
        return this.appointmentService.adminRescheduleAppointment(body);
    }
}
