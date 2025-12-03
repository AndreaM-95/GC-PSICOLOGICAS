import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CrearAdminDto } from './dto/crear-admin.dto';
import { CrearProfesionalDto } from './dto/crear-profesional.dto';
import { PersonaBaseDto } from './dto/persona-base.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/admin')
    createAdmin(@Body() body: CrearAdminDto) {
        return this.usersService.createAdmin(body);
    }

    @Post('/professional')
    createProfessional(@Body() body: CrearProfesionalDto) {
        return this.usersService.createProfessional(body);
    }

    @Post('/patient')
    createPatient(@Body() body: PersonaBaseDto) {
        return this.usersService.createPatient(body);
    }

    @Get('administrators')
    listAdmins() {
        return this.usersService.listAdministrators();
    }

    @Get('professionals')
    listPros() {
        return this.usersService.listProfessionals();
    }

    @Get('patients')
    listPats() {
        return this.usersService.listPatients();
    }
}
