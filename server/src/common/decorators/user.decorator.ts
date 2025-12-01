import { createParamDecorator, ExecutionContext } from '@nestjs/common';
/**
 * @description Extrae el objeto del usuario autenticado desde la petición HTTP.
 * Permite acceder directamente al usuario en los controladores
 * sin necesidad de obtenerlo manualmente desde el request.
 * @returns El usuario autenticado dentro del objeto request.
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);