import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { EstadosCita } from 'src/common/enums';
import { AppointmentsService } from '../appointments.service';

const citas = [
  {
    idCita: 1,
    idAdministrativo: 1,
    idProfesional: 1,
    idPaciente: 3,
    fechaCita: '2026-03-04',
    horaCita: '10:00',
    modalidad: 'presencial',
    consultorio: 'consultorio 2',
    motivo: 'Seguimiento mensual',
    estado: EstadosCita.CONFIRMADA,
  },
  {
    idCita: 2,
    idAdministrativo: 1,
    idProfesional: 2,
    idPaciente: 4,
    fechaCita: '2026-03-05',
    horaCita: '14:00',
    modalidad: 'virtual',
    consultorio: '',
    motivo: 'Consulta inicial',
    estado: EstadosCita.CANCELADA,
  },
  {
    idCita: 3,
    idAdministrativo: 2,
    idProfesional: 1,
    idPaciente: 2,
    fechaCita: '2026-03-06',
    horaCita: '09:00',
    modalidad: 'presencial',
    consultorio: 'consultorio 1',
    motivo: 'Evaluación psicológica',
    estado: EstadosCita.CANCELADA,
  },
];

jest.mock('bcrypt');

describe('AppointmntsService', () => {
  let service: AppointmentsService;
  let fakeAppointmentRepo;
  let fakePersonRepo;
  let fakeAdminRepo;
  let fakeProfessionalRepo;

  beforeEach(async () => {
    jest.clearAllMocks();

    fakeAppointmentRepo = {
      findOne: jest.fn(),
      create: jest.fn((newUFake) => ({ idUser: 1, active: true, ...newUFake })),
      save: jest.fn((user) => user),
      update: jest.fn(),
    };

    fakePersonRepo = {
      findOne: jest.fn(),
    };

    fakeAdminRepo = {
      findOne: jest.fn(),
    };

    fakeProfessionalRepo = {
      findOne: jest.fn(),
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('helodt7123');
    service = new AppointmentsService(
      fakeAppointmentRepo as any,
      fakePersonRepo as any,
      fakeAdminRepo as any,
      fakeProfessionalRepo as any,
    );
  });

  it('debe devolver las citas activas (admin)', async () => {
    const pacienteMock = {
      nombres: 'Andrea',
      apellidos: 'Mejia',
      citasComoPaciente: [
        {
          idCita: 1,
          fechaCita: '2026-03-04',
          horaCita: '10:00',
          modalidad: 'presencial',
          motivo: 'Seguimiento',
          consultorio: '1',
          estado: EstadosCita.CONFIRMADA,
          profesional: {
            persona: { nombres: 'Doc', apellidos: 'Uno' },
          },
          administrativo: {
            persona: { nombres: 'Admin', apellidos: 'Uno' },
          },
        },
        {
          idCita: 2,
          estado: EstadosCita.CANCELADA,
        },
      ],
    };

    fakePersonRepo.findOne.mockResolvedValue(pacienteMock);

    const result = await service.adminListAppointments('123');

    expect(result.totalCitas).toBe(1);
    expect(result.citas.length).toBe(1);
  });

  it('debe devolver todas las citas', async () => {
    const pacienteMock = {
      nombres: 'Andrea',
      apellidos: 'Mejia',
      citasComoPaciente: [
        {
          idCita: 1,
          fechaCita: '2026-03-04',
          horaCita: '10:00',
          modalidad: 'presencial',
          motivo: 'Seguimiento',
          consultorio: '1',
          estado: EstadosCita.CONFIRMADA,
          profesional: {
            persona: { nombres: 'Doc', apellidos: 'Uno' },
          },
          administrativo: {
            persona: { nombres: 'Admin', apellidos: 'Uno' },
          },
        },
        {
          idCita: 2,
          estado: EstadosCita.CANCELADA,
        },
      ],
    };

    fakePersonRepo.findOne.mockResolvedValue(pacienteMock);

    const result = await service.listAppointments('123');

    expect(result.totalCitas).toBe(2);
    expect(result.citas.length).toBe(2);
  });

  it('debe mostrar error cuando no se encuentra al paciente', async () => {
    fakePersonRepo.findOne.mockResolvedValue(null);

    await expect(service.adminListAppointments('123')).rejects.toThrow(
      'No existe un paciente con este número de documento',
    );
  });

  it('debe devolverse vacío cuando no haya citas', async () => {
    const pacienteMock = {
      nombres: 'Andrea',
      apellidos: 'Mejia',
      citasComoPaciente: [],
    };

    fakePersonRepo.findOne.mockResolvedValue(pacienteMock);

    const result = await service.listAppointments('123');

    expect(result.citas).toEqual([]);
  });

  it('debe devolverse vacío cuando no haya citas activas', async () => {
    const pacienteMock = {
      nombres: 'Andrea',
      apellidos: 'Mejia',
      citasComoPaciente: [{ idCita: 1, estado: EstadosCita.CANCELADA }],
    };

    fakePersonRepo.findOne.mockResolvedValue(pacienteMock);

    const result = await service.adminListAppointments('123');

    expect(result.citas).toEqual([]);
  });
});

