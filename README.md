<h1 align="center">PSICOGESTGESTIÓN DE CITAS PSICOLÓGICAS</h1>
<h2 align="center">GESTIÓN DE CITAS PSICOLÓGICAS</h2>
<p align="center"> <img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green"></p>

<h2>CONFIGURACIÓN DEL PROYECTO</h2> 

1. Instalar dependencias tanto para `server` como `client` ejecutando: `npm install` <br>
2. Debe tener una BDD con el nombre `citas_psicologicas`
3. En la carpeta del server, se debe iniciar las migraciones: `npm run typeorm migration:run` 
4. Ejecuta el frontend: `npm run dev`
5. Ejecuta el backend: `npm run start:dev`

---

<h2>EJECUCIÓN DE LOS FLUJOS</h2>

<h3>FLUJO DEL ADMINISTRADOR</h3> 

`⚠️IMPORTANTE⚠️:` Debe crear el usuario del administrativo para los pasos siguientes, esto lo hará en postman. Acontinuación las instrucciones:
- Una vez esté en postman, usar el endpoint `POST` para crear el primer admin. Su ruta es: `http://localhost:4000/users/admin`
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

---

<h3>CREACIÓN Y MANIPULACIÓN DE DATOS</h3>
<h4>📁CREACIÓN DE PERFILES</h4>

#### `👩‍💼 Administrativo`
1. Una vez inicie sesión, seleccione la tarjeta `Gestión del personal`
2. Debe seleccionar el rol del usuario que desea crear, en este caso, un administrativo
3. Diligencie todos los campos, éstos son obligatorios
4. De click en el botón de `Crear perfil`
5. Una vez creado, el formulario se limpiará
6. Verifique en su base de datos la creación de éste

#### `👩‍⚕️ Profesional - Médico -`
1. Una vez inicie sesión, seleccione la tarjeta `Gestión del personal`
2. Debe seleccionar el rol del usuario que desea crear, en este caso, un profesional
3. Diligencie todos los campos, éstos son obligatorios
4. De click en el botón de `Crear perfil`
5. Una vez creado, el formulario se limpiará
6. Verifique en su base de datos la creación de éste

#### `🧍‍♀️ Paciente`
1. Una vez inicie sesión, seleccione la tarjeta `Gestión del paciente`
2. Diligencie todos los campos, éstos son obligatorios
3. De click en el botón de `Crear perfil`
4. Una vez creado, el formulario se limpiará
5. Verifique en su base de datos la creación de éste

---

<h4>📁MÓDULO DE CITAS</h4>

Una vez inicie sesión como administrador, seleccione la tarjeta `Gestión de citas`, aquí podrá realizar:

#### `✔️Crear cita`
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Diligencia todos los campos, éstos son obligatorios
3. Una vez creado, el formulario se limpiará
4. Verifique en su base de datos la creación de la cita

#### `🔍Listar citas`
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Verá una tabla con las citas del paciente cumpliendo el orden de confirmada, asistida, cancelada y no asistida

#### `📝Reprogramar cita`
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Selecciona la cita que desea reprogramar, esta tendrá un estado de `confirmada`
3. Diligencia todos los campos, éstos son obligatorios
4. De click en el botón de `Reprogramar cita`
5. Una vez diligenciado, el formulario se limpiará
6. Verifique en su base de datos la actualización de la cita

#### `❌Cancelar cita`
1. En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
2. Selecciona la cita que desea cancelar, esta tendrá un estado de `confirmada`
3. Diligencia todos los campos, éstos son obligatorios
4. De click en el botón de `Cancelar cita`
5. Una vez diligenciado, el formulario se limpiará
6. Verifique en su base de datos la cancelación de la cita

---

# 🏗️ AQUITECTURA DEL SISTEMA
## Cliente
```
src/
 ├── assets/
 ├── components/
 |   ├── Generales/
 |   ├── GestionCitas/
 │   |   ├── CancelarCita.tsx
 │   |   ├── CrearCita.tsx
 │   |   ├── ListarCitas.tsx
 │   |   └── ReprogramarCita.tsx
 |   ├── GestionHistoria/
 |   ├── GestionMedicamento/
 |   ├── GestionPaciente/
 |   └── GestionPersonal/
 ├── context/
 ├── hooks/
 |   ├── flujoCitas.ts
 |   ├── useAppToast.ts
 |   ├── useAuth.ts
 |   ├── useCreateAppointmentForm.ts
 |   ├── usePatientProffesionalData.ts
 |   ├── usePatientsData.ts
 |   ├── usePatientSearch.ts
 |   └── useProfessionalData.ts
 ├── pages/
 |   ├── GestionCitas/
 │   |   └── GestionCitas.tsx
 |   ├── GestionHistoria/
 │   |   └── GestionHistoria.tsx
 |   ├── GestionMedicamento/
 │   |   └── GestionMedicamento.tsx
 |   ├── GestionPaciente/
 │   |   └── GestionPaciente.tsx
 |   ├── GestionPersonal/
 │   |   └── GestionPersonal.tsx
 |   ├── Login.tsx
 |   ├── Menu.tsx
 |   └── Register.tsx
 ├── routes/
 |   └── AppRoutes.tsx
 ├── services/
 |   ├── api.ts 
 |   ├── appointments.service.ts
 |   ├── auth.service.ts
 |   └── user.service.ts
 ├── types/
 |   ├── auth.ts 
 |   ├── autorizacion.ts 
 |   ├── cita.ts 
 |   ├── enums.ts 
 |   ├── historia.ts
 |   ├── index.ts
 |   └── persona.ts
 ├── utils/
 |   ├── formatoFecha.ts 
 |   └── inputValidation.ts
 ├── App.css
 ├── App.tsx
 ├── index.css
 └──  main.tsx
```

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

---

## 🛠️ STACK TECNOLÓGICO

| BACKEND | FRONTEND | OTRAS |
|--------|-------|-------|
| Typescript | Typescript | Postman |
| Nest JS | React JS | DBeaver |
| Typeorm | Tailwind CSS | GIT/GITHUB |
| JWT | Primereact | |
| Bcrypt | |
| MySQL | |

---

## Generación y ejecución de migraciones
```
npm run typeorm migration:generate src/migrations/InitMigration
npm run typeorm migration:run
```

---

### 🛠️ Paquetes instalados

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

## 🚀 ENDPOINTS

### 🔐 Auth — `/auth`

| Método | Ruta | Descripción | Requiere Token |
|--------|-------|--------|-------|
| POST | `/auth/register` | Registra un nuevo paciente | ❌ |
| POST | `/auth/login` | Inicia sesión y devuelve token JWT | ❌ |
| GET | `/auth/profile` | Devuelve la informacion del usuario | ✅ |


### 👤 Usuarios — `/appointments`

| Método | Ruta | Descripción | Rol permitido | Token |
|--------|-------|--------|-------|-------|
| POST | `/appointments` | Crear una cita medica | admin y paciente | ✅ |
| GET | `/appointments/:document` | Lista todas las citas | admin y paciente | ✅ |
| PUT | `/appointments/update` | Actualiza una cita | admin y paciente | ✅ |
| PATCH | `/appointments/cancel` | Cancelar una cita | admin y paciente | ✅ |

---

## 🔑 Autenticación

- Los endpoints protegidos requieren un **token JWT** en el header:  
  ```
  Authorization: Bearer <token>
  ```
- Los tokens se generan al iniciar sesión (`/auth/login`).  
- Las contraseñas se almacenan **encriptadas con bcrypt** antes de guardarse en la base de datos.

### Ejemplo de flujo de prueba

1. Registrar un usuario (`/auth/register`)
2. Iniciar sesión (`/auth/login`)
3. Copiar el token JWT devuelto
4. Usar el token para acceder a `/appointments`, `/appointments/:document` o `/appointments/cancel`

**Ejemplo de Login Request:**
```json
{
  "email": "admin1@gmail.com",
  "password": "123456"
}
```

**Ejemplo de Login Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 👩‍💻 DESARROLLO

**⭐ APRENDIZ** — Yuri Andrea Mejía Ramírez <br>
**⭐ FICHA** — 3118300 <br>
**⭐ UBICACIÓN** — Bogotá DC <br>
**⭐ AÑO** — 2025 - 2026 <br>

---

## 📄 LICENCIA

💜 **GESTIÓN DE CITAS** — Una plataforma para citas psicológicas.  
© 2025 **OL-STUDIOS** — Todos los derechos reservados.
