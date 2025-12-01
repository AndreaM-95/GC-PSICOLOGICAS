# Plataforma de citas

## Paquetes instalados

```
npm install react-router-dom

npm install --save-dev @types/class-validator
npm install class-validator class-transformer
npm install @nestjs/typeorm typeorm mysql2
npm install -D typeorm ts-node
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install --save-dev jest @types/jest ts-jest
npm install --save @nestjs/swagger swagger-ui-express
```

---

## Ejecutar el proyecto
- Ejecuta el frontend: `npm run dev`
- Ejecuta el backend: `npm run start:dev`

---

## Ejecuta el flujo del administrador
- Inicia sesión con el correo corporativo y la contraseña
- Selecciona el panel de su interés

# AQUITECTURA
## Cliente


## Servidor
```
src/
 ├── common/
 │   ├── decorators
 │   │   └── user.decorator.ts
 │   ├── enums
 │   |   ├── Especialidades.ts
 │   |   ├── EstadosAutorizacion.ts
 │   |   ├── EstadosCita.ts
 │   |   ├── EstadosUsuario.ts
 │   |   ├── Generos.ts
 │   |   ├── index.ts
 │   |   ├── ModalidadCita.ts
 │   |   ├── Roles.ts
 │   |   └── TipoAntecedente.ts
 │   ├── exceptions
 │   |   └── custom-http.exception.ts
 │   └──  filters
 │       └── http-exception.filter.ts
 ├── migrations
 │   └── 1764529724835-InitMigration.ts 
 ├── modules/
 |   ├── appointments/
 │   |   ├── dto/
 |   │   |   └── createAppointment.dto.ts
 │   |   ├── entities/
 |   │   |   └── cita.entity.ts
 │   |   ├── test/
 |   │   |   ├── appointments.controller.spec.ts
 |   │   |   └── appointments.service.spec.ts
 │   |   ├── appointments.controller.ts
 │   |   ├── appointments.module.ts
 │   |   └── appointments.service.ts
 |   ├── auth/
 │   |   ├── dto/
 |   │   |   ├── login-user.dto.ts
 |   │   |   └── register.dto.ts
 │   |   ├── guards/
 |   │   |   ├── test
 |   |   │   |   ├── jwt.guard.spec.ts
 |   |   │   |   └── roles.guard.spec.ts
 |   │   |   ├── jwt.guard.ts
 |   │   |   └── roles.guard.ts
 │   |   ├── strategies/
 |   │   |   ├── jwt.strategy.spec.ts
 |   │   |   └── jwt.strategy.ts
 │   |   ├── test/
 |   │   |   ├── auth.controller.spec.ts
 |   │   |   └── auth.service.spec.ts
 │   |   ├── auth.controller.ts
 │   |   ├── auth.module.ts
 │   |   └── auth.service.ts
 |   ├── medicalAuthorizations/
 │   |   ├── dto/
 |   │   |   └── create-medical-authorization.dto.ts
 │   |   ├── entities/
 |   │   |   └── medicamentoRecetado.entity.ts
 │   |   ├── test/
 |   │   |   ├── payment.controller.spec.ts
 |   │   |   └── payment.service.spec.ts
 │   |   ├── payment.controller.ts
 │   |   ├── payment.module.ts
 │   |   └── payment.service.ts
 |   ├── medical-histories/
 │   |   ├── dto/
 |   │   |   └── create-medical-history.dto.ts
 │   |   ├── entities/
 |   │   |   ├── antecedente.entity.ts
 |   │   |   ├── evolucion.entity.ts
 |   │   |   ├── historiaClinica.entity.ts
 |   │   |   └── intervencion.entity.ts
 │   |   ├── test/
 |   │   |   ├── medical-histories.controller.spec.ts
 |   │   |   └── medical-histories.service.spec.ts
 │   |   ├── medical-histories.controller.ts
 │   |   ├── medical-histories.module.ts
 │   |   └── medical-histories.service.ts
 |   └──  users/
 │       ├── dto/
 |       |   ├── crear-admin.dto.ts
 |       |   ├── crear-profesional.dto.ts
 |       |   └── persona-base.dto.ts
 │       ├── entities/
 |       |   ├── administrativo.entity.ts
 |       |   ├── persona.entity.ts
 |       |   └── profesional.entity.ts
 │       ├── test/
 |       |   ├── users.controller.spec.ts
 |       |   └── users.service.spec.ts
 │       ├── users.controller.ts
 │       ├── users.module.ts
 │       └── users.service.ts
 ├── app.controller.spec.ts
 ├── app.controller.ts
 ├── app.module.ts
 ├── app.service.ts
 └── main.ts
```

## Generación y ejecución de migraciones
```
npm run typeorm migration:generate src/migrations/InitMigration
npm run typeorm migration:run
```