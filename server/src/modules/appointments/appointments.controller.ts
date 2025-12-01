import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDTO } from './dto/createAppointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService ) {}

    @Post('/admin')
    adminCreateAppointment(@Body() body: CreateAppointmentDTO) {
        return this.appointmentService.adminCreateAppointment(body);
    }
}
