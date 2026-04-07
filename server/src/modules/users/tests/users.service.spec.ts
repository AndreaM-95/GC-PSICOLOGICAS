import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcrypt';
import { EstadosUsuario, Genero, Roles } from 'src/common/enums';

const adminUser=[
  {idFake: 1, nombres: 'Vale', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero: Genero.OTRO, ciudadResidencia: '', celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', cargo: '', rol: Roles.ADMINISTRATIVO, estado: EstadosUsuario.ACTIVO},
  {idFake: 2, nombres: 'Olafo', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.FEMENINO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', cargo: '', rol: Roles.ADMINISTRATIVO, estado: EstadosUsuario.ACTIVO},
  {idFake: 3, nombres: 'Natalia', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.FEMENINO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', cargo: '', rol: Roles.ADMINISTRATIVO, estado: EstadosUsuario.INACTIVO},
  {idFake: 4, nombres: 'Santiago', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.MASCULINO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', cargo: '', rol: Roles.ADMINISTRATIVO, estado: EstadosUsuario.ACTIVO},
];

const medicoUser=[
  {idFake: 1, nombres: 'Vale', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.FEMENINO, ciudadResidencia: '', celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', licencia: '', especialidad: '', rol: Roles.PROFESIONAL, estado: EstadosUsuario.ACTIVO},
  {idFake: 2, nombres: 'Olafo', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.FEMENINO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', licencia: '', especialidad: '', rol: Roles.PROFESIONAL, estado: EstadosUsuario.ACTIVO},
  {idFake: 3, nombres: 'Natalia', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.MASCULINO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', licencia: '', especialidad: '', rol: Roles.PROFESIONAL, estado: EstadosUsuario.INACTIVO},
  {idFake: 4, nombres: 'Santiago', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.MASCULINO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', licencia: '', especialidad: '', rol: Roles.PROFESIONAL, estado: EstadosUsuario.INACTIVO},
];

const paciente=[
  {idFake: 1, nombres: 'Vale', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.OTRO, ciudadResidencia: '', celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', rol: Roles.PACIENTE, estado: EstadosUsuario.INACTIVO},
  {idFake: 2, nombres: 'Olafo', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.OTRO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', rol: Roles.PACIENTE, estado: EstadosUsuario.ACTIVO},
  {idFake: 3, nombres: 'Natalia', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.OTRO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', rol: Roles.PACIENTE, estado: EstadosUsuario.ACTIVO},
  {idFake: 4, nombres: 'Santiago', apellidos: '', tipoDocumento: '', fechaNacimiento: '', genero:  Genero.OTRO, ciudadResidencia: '',  celular: '', correo: '', eps: '', nombresContactoEmergencia: '', celularContactoEmergencia: '', contrasena: '', rol: Roles.PACIENTE, estado: EstadosUsuario.ACTIVO},
];

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let fakePersonRepo;
  let fakeAdminRepo;
  let fakeProfessionalRepo;

  beforeEach(async () => {
    jest.clearAllMocks();

    fakePersonRepo={
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn((newUFake) => ({idUser: 1, active: true, ...newUFake})),
      save: jest.fn((user) => user),
      update: jest.fn()
    };

    fakeAdminRepo={
      findOne: jest.fn(),
      create: jest.fn((newUFake) => ({idUser: 1, active: true, ...newUFake})),
      save: jest.fn((user) => user),
      update: jest.fn()
    };

    fakeProfessionalRepo={
      findOne: jest.fn(),
      create: jest.fn((newUFake) => ({idUser: 1, active: true, ...newUFake})),
      save: jest.fn((user) => user),
      update: jest.fn()
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('helodt7123');
    service = new UsersService(fakePersonRepo as any, fakeAdminRepo as any, fakeProfessionalRepo as any);
  });

  it('debe listar a los administradores activos', async () => {
    fakePersonRepo.find.mockResolvedValue(adminUser);

    const result = await service.listAdministrators();

    expect(fakePersonRepo.find).toHaveBeenCalledWith({
      where: { rol: Roles.ADMINISTRATIVO },
      relations: ["administrativo"]
    });

    expect(result).toEqual([
      adminUser[0],
      adminUser[1],
      adminUser[3]
    ]);
  });

  it('debe listar a los profesionales activos', async () => {
    fakePersonRepo.find.mockResolvedValue(medicoUser);

    const result = await service.listProfessionals();

    expect(fakePersonRepo.find).toHaveBeenCalledWith({
      where: { rol: Roles.PROFESIONAL },
      relations: ["profesional"]
    });

    expect(result).toEqual([
      medicoUser[0],
      medicoUser[1]
    ]);
  });

  it('debe listar a los pacientes activos', async () => {
    fakePersonRepo.find.mockResolvedValue(paciente);

    const result = await service.listPatients();

    expect(fakePersonRepo.find).toHaveBeenCalledWith({
      where: { rol: Roles.PACIENTE },
      relations: []
    });

    expect(result).toEqual([
      paciente[1],
      paciente[2],
      paciente[3]
    ]);
  });

  it('debe devolver un array vacío cuando todos los usuarios estén inactivos', async () => {
    const inactive = adminUser.map(u => ({
      ...u,
      estado: EstadosUsuario.INACTIVO
    }));

    fakePersonRepo.find.mockResolvedValue(inactive);
    const result = await service.listAdministrators();
    expect(result).toEqual([]);
  });

  it('debe devolver un array vacío cuando no existan usuarios', async () => {
    fakePersonRepo.find.mockResolvedValue([]);
    const result = await service.listAdministrators();
    expect(result).toEqual([]);
  });
});

