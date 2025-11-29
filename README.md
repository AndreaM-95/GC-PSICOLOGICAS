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
 │   ├── exceptions
 │   |   └── custom-http.exception.ts
 │   └──  filters
 │       └── http-exception.filter.ts
 ├── migrations
 │   ├── 1763522992399-SeedUsers.ts
 │   └── 1763523631917-InitMigration.ts 
 ├── modules/
 |   ├── appointments/
 │   |   ├── dto/
 |   │   |   └── createAppointment.dto.ts
 │   |   ├── entities/
 |   │   |   └── Appointment.entity.ts
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
 |   │   |   └── MedicalAuthorization.entity.ts
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
 |   │   |   └── MedicalHistory.entity.ts
 │   |   ├── test/
 |   │   |   ├── medical-histories.controller.spec.ts
 |   │   |   └── medical-histories.service.spec.ts
 │   |   ├── medical-histories.controller.ts
 │   |   ├── medical-histories.module.ts
 │   |   └── medical-histories.service.ts
 |   └──  users/
 │       ├── dto/
 |       |   └── createUser.dto.ts
 │       ├── entities/
 |       |   └── User.entity.ts
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