import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginDTO } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { PersonaBaseDto } from '../users/dto/persona-base.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() data: PersonaBaseDto) {
        return this.authService.register(data);
    }

    @Post('login')
    login(@Body() data: LoginDTO) {
        return this.authService.login(data);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
