<h1 align="center"> ⚕︎ PSICOGEST ⚕︎</h1>
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

`⚠️IMPORTANTE⚠️:` Deberá crear el usuario del administrativo, después de haber generado las migraciones, procederemos a ejecutar los pasos siguientes, esto lo hará en postman. A continuación las instrucciones:
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

<h3>FLUJO DE NAVEGACIÓN</h3>
<h4>📁MÓDULO DEL PERSONAL</h4>

Una vez inicie sesión como administrador, seleccione la tarjeta `Gestión del personal`, aquí podrá realizar:

#### `✔️Crear un administrativo o profesional médico`
```
Inicio
├── En el dropdown debe seleccionar el rol del empleado a buscar
|   ├── Si es administrativo
|   |   ├── Diligencia todos los campos de registro
|   |   ├── Diligencia el campo adicional que es el cargo
|   |   └── Da click en el botón de "Crear perfil"
|   └── Si es un profesional médico
|       ├── Diligencia todos los campos de registro
|       ├── Diligencia los campos adicionales que son la licencia y la especialidad [psiquiatria / psicologia]
|       └── Da click en el botón de "Crear perfil"
└── Fin
```

#### `🔍Listar el personal activo`
```
Inicio
├── En el dropdown debe seleccionar el rol de los empleados a buscar
├── Se listará los datos de los usuarios activos en el sistema
└── Fin
```

#### `📝Actualizar un usuario`
```
Inicio
├── En el dropdown debe seleccionar el rol del empleado a buscar
|   ├── Si es administrativo
|   |   └── Se habilitá una barra de búsqueda para encontrar al usuario del área administrativa
|   |       ├── Diligencia todos los campos que desea actualizar
|   |       ├── Puede elegir si cambiar la contraseña o no
|   |       └── Da click en el botón de "Actualizar perfil"
|   └── Si es un profesional médico
|       └── Se habilitá una barra de búsqueda para encontrar al usuario del área médica
|           ├── Diligencia todos los campos que desea actualizar
|           ├── Puede elegir si cambiar la contraseña o no
|           └── Da click en el botón de "Actualizar perfil"
└── Fin
```

#### `❌Inactivar un usuario`
```
Inicio
├── En el dropdown debe seleccionar el rol del empleado a buscar
|   ├── Si es administrativo
|   |   └── Se habilitá una barra de búsqueda para encontrar al usuario del área administrativa
|   |       ├── Se confirma el nombre de la persona a inactivar
|   |       └── Da click en el botón de "Inactivar"
|   └── Si es un profesional médico
|       └── Se habilitá una barra de búsqueda para encontrar al usuario del área médica
|           ├── Se confirma el nombre de la persona a inactivar
|           └── Da click en el botón de "Inactivar perfil"
└── Fin
```

#### `Tabla de imágenes`
<table>
  <tr>
    <td align="center">
      <img width="200" alt="Crear_Usuario" src="https://github.com/user-attachments/assets/57307f27-165e-4592-beb5-78183727dc7c" /><br/>
      Crear usuario
    </td>
    <td align="center">
      <img width="200" alt="Listar_Usuarios" src="https://github.com/user-attachments/assets/aa87cdc4-caf4-4dd2-a218-cb2dafa43347" /><br/>
      Listar usuarios
    </td>
    <td align="center">
      <img width="200" alt="Actualizar_Usuario" src="https://github.com/user-attachments/assets/64c9b96f-33a1-430e-a12b-61dffb1cb1bf" /><br/>
      Actualizar usuario
    </td>
    <td align="center">
      <img width="200" alt="Inactivar_Usuario" src="https://github.com/user-attachments/assets/46204727-b994-44a9-a7a7-21ae46014cf8" /><br/>
      Inactivar usuario
    </td>
  </tr>
</table>

---

<h4>📁MÓDULO DE LOS PACIENTES</h4>

Una vez inicie sesión como administrador, seleccione la tarjeta `Gestión del paciente`, aquí podrá realizar:

#### `✔️Crear un paciente`
```
Inicio
├── Diligencia todos los campos de registro
├── Da click en el botón de "Crear perfil"
└── Fin
```

#### `🔍Listar pacientes activos`
```
Inicio
├── Seleccionar el menú de listar
├── Se listará los datos de los pacientes activos en el sistema
└── Fin
```

#### `📝Actualizar un paciente`
```
Inicio
├── Debe dilignciar en la barra de búsqueda el documento del paciente
|   ├── Diligencia todos los campos que desea actualizar
|   ├── Puede elegir si cambiar la contraseña o no
|   └── Da click en el botón de "Actualizar perfil"
└── Fin
```

#### `❌Inactivar un paciente`
```
Inicio
├── Debe dilignciar en la barra de búsqueda el documento del paciente
|   ├── Se confirma el nombre de la persona a inactivar
|   └── Da click en el botón de "Inactivar perfil"
└── Fin
```

#### `Tabla de imágenes`
<table>
  <tr>
    <td align="center">
      <img width="200" alt="Crear_Paciente" src="https://github.com/user-attachments/assets/b514f597-2bea-4196-9e18-02eb0dbc806f" /><br/>
      Crear paciente
    </td>
    <td align="center">
      <img width="200" alt="Listar_Pacientes" src="https://github.com/user-attachments/assets/764edd66-f17f-45f9-8709-22ef02224365" /><br/>
      Listar pacientes
    </td>
    <td align="center">
      <img width="200" alt="Actualizar_Paciente" src="https://github.com/user-attachments/assets/0d1d58ef-93fc-4e2d-b6fe-afab3e755d52" /><br/>
      Actualizar paciente
    </td>
    <td align="center">
      <img width="200" alt="Inactivar_Paciente" src="https://github.com/user-attachments/assets/1fe39a34-8cc1-4d93-b905-ea87fba4a529" /><br/>
      Inactivar paciente
    </td>
  </tr>
</table>

---

<h4>📁MÓDULO DE CITAS</h4>

Una vez inicie sesión como administrador, seleccione la tarjeta `Gestión de citas`, aquí podrá realizar:

#### `✔️Crear cita`
```
Inicio
├── En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
|   ├── Diligencia todos los campos, éstos son obligatorios
|   └── Da click en el botón de "Asignar cita"
└── Fin
```

#### `🔍Listar citas`
```
Inicio
├── En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
|   └── Verá una tabla con las citas del paciente cumpliendo el orden de confirmada, asistida, cancelada y no asistida
└── Fin
```

#### `📝Reprogramar cita`
```
Inicio
├── En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
|   └── Selecciona la cita que desea reprogramar, esta tendrá un estado de "confirmada"
|       ├── Diligencia todos los campos, éstos son obligatorios
|       └── De click en el botón de "Reprogramar cita"
└── Fin
```

#### `❌Cancelar cita`
```
Inicio
├── En la barra de búsqueda, digita el número de documento del usuario a buscar -Debe haber creado un paciente primero -
|   └── Selecciona la cita que desea reprogramar, esta tendrá un estado de "confirmada"
|       ├── Diligencia todos los campos, éstos son obligatorios
|       └── De click en el botón de "Cancelar cita"
└── Fin
```

#### `Tabla de imágenes`
<table>
  <tr>
    <td align="center">
      <img width="200" alt="Crear_Cita" src="https://github.com/user-attachments/assets/352dbb52-4002-4176-818b-9dd6839e28aa" /><br/>
      Crear cita
    </td>
    <td align="center">
      <img width="200" alt="Listar_Citas" src="https://github.com/user-attachments/assets/7ccc5e87-1819-4bc6-9abb-e47298c852eb" /><br/>
      Listar citas activas
    </td>
    <td align="center">
      <img width="200" alt="Actualizar_Cita" src="https://github.com/user-attachments/assets/3283e0ff-32f6-47a5-8a60-e53491cc41d1" /><br/>
      Actualizar cita 1
    </td>
     <td align="center">
      <img width="200" alt="Actualizar_Cita_Form" src="https://github.com/user-attachments/assets/0c18fafe-e762-4d5b-8429-63bd8ef131bb" /><br/>
      Actualizar cita 2
    </td>
    <td align="center">
      <img width="200" alt="Cancelar_Cita" src="https://github.com/user-attachments/assets/fc6031cc-29ea-4b26-955e-f0d0565206af" /><br/>
      Cancelar cita
    </td>
  </tr>
</table>

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
 |   ├── GestionPaciente/
 │   |   ├── ActualizarPaciente.tsx
 │   |   ├── CrearPaciente.tsx
 │   |   ├── InactivarPaciente.tsx
 │   |   ├── ListarPacientes.tsx
 │   |   └── PacienteForm.tsx
 |   └──  GestionPersonal/
 │       ├── CrearUsuario.tsx
 │       ├── EditarUsuario.tsx
 │       ├── InactivarUsuario.tsx
 │       ├── ListarUsuarios.tsx
 │       └── PersonalForm.tsx
 ├── context/
 ├── hooks/
 |   ├── flujoCitas.ts
 |   ├── useAdminData.ts
 |   ├── useAdminSearch.ts
 |   ├── useAppToast.ts
 |   ├── useAuth.ts
 |   ├── useConfirmDeactivate.ts
 |   ├── useCreateAppointmentForm.ts
 |   ├── usePatientProffesionalData.ts
 |   ├── usePatientsData.ts
 |   ├── usePatientSearch.ts
 |   ├── useProfessionalData.ts
 |   └── useProfessionalSearch.ts
 ├── pages/
 |   ├── GestionCitas/
 │   |   └── GestionCitas.tsx
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
 |   ├── patient.service.ts
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
 |   ├── constantes.ts
 |   ├── formatoFecha.ts 
 |   └── inputValidation.ts
 ├── App.css
 ├── App.tsx
 ├── index.css
 └── main.tsx
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
| Bcrypt | | | |
| MySQL | | | |

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

### 👩‍⚕️ Módulo del personal — `/users`

<p><em>Área administrativa</em></p>

| Método | Ruta | Descripción | Rol permitido | Token |
|--------|-------|--------|-------|-------|
| POST | `/users/admin` | Crear un administrativo | admin | ✅ |
| GET | `/users/administrators` | Lista todos los administradores | admin | ✅ |
| PUT | `/users/admin/:id` | Actualizar un administrativo | admin | ✅ |
| PATCH | `/users/user/:id` | Desactiva a un usuario | admin y paciente | ✅ |

<p><em>Profesionales médicos</em></p>

| Método | Ruta | Descripción | Rol permitido | Token |
|--------|-------|--------|-------|-------|
| POST | `/users/professional` | Crear un profesional Psicologo/Psiquiatra | admin | ✅ |
| GET | `/users/professionals` | Lista todos los profesionales activos | admin | ✅ |
| PUT | `/users/administrators` | Actualizar un profesional médico | admin | ✅ |
| PATCH | `/users/user/:id` | Desactiva a un usuario | admin y paciente | ✅ |

### 👤 Módulo de pacientes — `/users`

| Método | Ruta | Descripción | Rol permitido | Token |
|--------|-------|--------|-------|-------|
| POST | `/users/patient` | Crear un paciente | admin y paciente | ✅ |
| GET | `/users/patients` | Lista todos los pacientes activos | admin | ✅ |
| PUT | `/users/patient/:id` | Actualiza un paciente | admin y paciente | ✅ |

### 🧠 Módulo de citas — `/appointments`

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

## PREFIJOS PARA LOS COMMITS
Estos serían los prefijos que pueden empezar a encontrar en el historial de git:

- `add`: Se añade un nuevo archivo
- `change`: Se modifica un archivo existente
- `fix`: Arregla un bug que afecta al usuario.
- `feat`: Una nueva característica para el usuario.
- `perf`: Cambios que mejoran el rendimiento del sitio.
- `build`: Cambios en el sistema de build, tareas de despliegue o instalación.
- `ci`: Cambios en la integración continua.
- `docs`: Cambios en la documentación.
- `refactor`: Refactorización del código como cambios de nombre de variables o funciones.
- `style`: Cambios de formato, tabulaciones, espacios o puntos y coma, etc; no afectan al usuario.
- `test`: Añade tests o refactoriza uno existente.

---

## 👩‍💻 DESARROLLO

**⭐ APRENDIZ** — Yuri Andrea Mejía Ramírez <br>
**⭐ FICHA** — 3118300 <br>
**⭐ UBICACIÓN** — Bogotá DC <br>
**⭐ AÑO** — 2025 - 2026 <br>

---

## 📄 LICENCIA

💜 **PSICOGEST** — Una plataforma para citas psicológicas.  
© 2026 — Todos los derechos reservados.
