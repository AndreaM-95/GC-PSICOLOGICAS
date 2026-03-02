import { Body, Controller, Get, Patch, Post, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CrearAdminDto } from './dto/crear-admin.dto';
import { CrearProfesionalDto } from './dto/crear-profesional.dto';
import { PersonaBaseDto } from './dto/persona-base.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Roles as Rol } from 'src/common/enums/Roles';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ActualizarPacienteDTO } from './dto/actualizar-paciente.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    //-----------------------------------------------------------
    //------ PERSONAL ------
    //------ CRUD ADMINISTRATIVO ------
    @Get('administrators')
    listAdmins() {
        return this.usersService.listAdministrators();
    }

    @Post('/admin')
    createAdmin(@Body() body: CrearAdminDto) {
        return this.usersService.createAdmin(body);
    }

    //------ CRUD PROFESIONAL ------
    @Post('/professional')
    crearProfesional(@Body() body: CrearProfesionalDto) {
        return this.usersService.createProfessional(body);
    }

    @Get('professionals')
    listarProfecionales() {
        return this.usersService.listProfessionals();
    }

    //-----------------------------------------------------------
    //------ PACIENTE ------
    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Post('/patient')
    createPatient(@Request() req, @Body() body: PersonaBaseDto) {
        return this.usersService.createPatient(req, body);
    }

    @Roles(Rol.ADMINISTRATIVO)
    @Get('patients')
    listarPacientes() {
        return this.usersService.listPatients();
    }

    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Put("update")
    actualizarPaciente(@Request() req, @Body() dto: ActualizarPacienteDTO){
        
    }

    @Roles(Rol.ADMINISTRATIVO, Rol.PACIENTE)
    @Patch("deactivate")
    inactivarPaciente(@Request() req){

    }

    //-----------------------------------------------------------
    //------ GENERALES ------
}
