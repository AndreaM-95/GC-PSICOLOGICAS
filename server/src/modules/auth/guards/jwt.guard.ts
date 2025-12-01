import { ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        
        if (!authHeader) {
        this.logger.warn('Authentication attempt without Authorization header');
        } else {
        this.logger.log(`JWT authentication attempt for endpoint: ${request.method} ${request.url}`);
        }
        
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.warn(`JWT authentication failed: ${info?.message || 'Invalid or missing token'}`);
      throw err || new UnauthorizedException('Invalid or missing JWT token');
    }

    this.logger.log(`JWT authentication successful for user ID: ${user.idUser}`);
        return user;
    }
}