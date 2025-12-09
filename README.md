# Plataforma de citas

### Paquetes instalados

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
# CONFIGURACIÓN DEL ENTORNO

## Ejecutar el proyecto
1. Instalar dependencias tanto para server como client: `npm install`
2. Debe tener una BDD con el nombre citas_psicologicas
3. En la carpeta del server, se debe iniciar las migraciones: `npm run typeorm migration:run` 
4. Ejecuta el frontend: `npm run dev`
5. Ejecuta el backend: `npm run start:dev`

---

## Ejecuta el flujo del administrador
- Desde postman, usar el endpoint `POST` para crear el primer admin y así ejecutar su flujo. Su ruta es: `localhost/4000/users/admin`
- Ejemplo de estructura del objeto para la creación del usuario:
```  
   {
    "nombres": "Andrea",
    "apellidos": "Ramirez",
    "tipoDocumento": "CC",
    "numeroDocumento": "1110899220",
    "fechaNacimiento": "1993-07-12",
    "genero": "femenino",
    "ciudadResidencia": "Bogotá",
    "celular": 3121477878,
    "correo": "admin1@gmail.com",
    "eps": "Sanitas",
    "nombresContactoEmergencia": "Natalia Sanchez",
    "celularContactoEmergencia": 3121477878,
    "contrasena": "123456",
    "cargo": "Servicio al cliente"
}
```
- Ya puede ejecutar el login desde el Frontend 
- Inicia sesión con el correo corporativo y la contraseña
- Selecciona el panel de su interés

## Flujos de creación y manipulación de datos

### Crear administrativo
1. Una vez inicie sesión, seleccione la tarjeta `Gestión del personal`
2. Debe seleccionar el rol del usuario que desea crear, en este caso, un administrativo
3. Diligencie todos los campos, éstos son obligatorios
4. De click en el botón de `Crear perfil`
5. Una vez creado, el formulario se limpiará
6. Verifique en su base de datos la creación de éste

### Crear profesional - Médico -
1. Una vez inicie sesión, seleccione la tarjeta `Gestión del personal`
2. Debe seleccionar el rol del usuario que desea crear, en este caso, un profesional
3. Diligencie todos los campos, éstos son obligatorios
4. De click en el botón de `Crear perfil`
5. Una vez creado, el formulario se limpiará
6. Verifique en su base de datos la creación de éste

### Crear paciente
1. Una vez inicie sesión, seleccione la tarjeta `Gestión del paciente`
2. Diligencie todos los campos, éstos son obligatorios
3. De click en el botón de `Crear perfil`
4. Una vez creado, el formulario se limpiará
5. Verifique en su base de datos la creación de éste

### Módulo de citas
Una vez inicie sesión como administrador, seleccione la tarjeta `Gestión de citas`, aquí podrá realizar:

#### Crear cita
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Diligencia todos los campos, éstos son obligatorios
3. Una vez creado, el formulario se limpiará
4. Verifique en su base de datos la creación de la cita

#### Listar citas
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Verá una tabla con las citas del paciente cumpliendo el orden de confirmada, asistida, cancelada y no asistida

#### Reprogramar cita
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Selecciona la cita que desea reprogramar, esta tendrá un estado de `confirmada`
3. Diligencia todos los campos, éstos son obligatorios
4. De click en el botón de `Reprogramar cita`
5. Una vez diligenciado, el formulario se limpiará
6. Verifique en su base de datos la actualización de la cita

#### Cancelar cita
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Selecciona la cita que desea cancelar, esta tendrá un estado de `confirmada`
3. Diligencia todos los campos, éstos son obligatorios
4. De click en el botón de `Cancelar cita`
5. Una vez diligenciado, el formulario se limpiará
6. Verifique en su base de datos la cancelación de la cita

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