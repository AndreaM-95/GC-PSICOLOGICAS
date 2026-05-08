import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { LoginDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { PersonaBaseDto } from '../users/dto/persona-base.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Módulo de autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registro de un paciente.' })
    register(@Body() data: PersonaBaseDto) {
        return this.authService.register(data);
    }

    @Post('login')
    @ApiOperation({ summary: 'Inicio de sesión.' })
    login(@Body() data: LoginDTO) {
        return this.authService.login(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Perfil de la persona logueada' })
    getProfile(@Request() req) {
        return req.user;
    }
}
