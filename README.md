# Plataforma de citas

## Paquetes instalados

```
npm install react-router-dom
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
 |   ├── auth/
 │   |   ├── dto/
 |   │   |   ├── admin-create-user.dto.ts
 |   │   |   ├── change-password-user.dto.ts
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
 |   ├── medicalAuthorization/
 │   |   ├── dto/
 |   │   |   ├── create-payment-from-trip.dto.ts
 |   │   |   ├── earnings-query.dto.ts
 |   │   |   ├── passenger-payment-history-query.dto.ts
 |   │   |   └── payment-response.dto.ts
 │   |   ├── entities/
 |   │   |   └── Payment.entity.ts
 │   |   ├── test/
 |   │   |   ├── payment.controller.spec.ts
 |   │   |   └── payment.service.spec.ts
 │   |   ├── payment.controller.ts
 │   |   ├── payment.module.ts
 │   |   └── payment.service.ts
 |   ├── appointment/
 │   |   ├── dto/
 |   │   |   └── createRating.dto.ts
 │   |   ├── entities/
 |   │   |   └── Rating.entity.ts
 │   |   ├── test/
 |   │   |   ├── ratings.controller.spec.ts
 |   │   |   └── ratings.service.spec.ts
 │   |   ├── ratings.controller.ts
 │   |   ├── ratings.module.ts
 │   |   └── ratings.service.ts
 |   ├── medicalRecord/
 │   |   ├── dto/
 |   │   |   └── create-medicalRecord.dto.ts
 │   |   ├── entities/
 |   │   |   ├── locations.entity.ts
 |   │   |   └── trip.entity.ts
 │   |   ├── test/
 |   │   |   ├── trips.controller.spec.ts
 |   │   |   └── trips.service.spec.ts
 │   |   ├── trips.controller.ts
 │   |   ├── trips.module.ts
 │   |   └── trips.service.ts
 |   └──  users/
 │       ├── dto/
 |       |   ├── change-password.dto.ts
 |       |   ├── createUser.dto.ts
 |       |   ├── recover-password.dto.ts
 |       |   ├── updateDriverStatus.dto.ts
 |       |   ├── updateUserAdmin.dto.ts
 |       |   └── updateUserSelf.dto.ts
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

## Servidor
