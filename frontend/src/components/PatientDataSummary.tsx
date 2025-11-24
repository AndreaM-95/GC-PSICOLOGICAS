import { EstadoPersona, Generos, RolPersona, TipoDocumento, type IPaciente } from "../types";

export default function PatientDataSummary() {
    // TODO: Replace this with real data fetching logic
    const patient: IPaciente = {
        idPaciente: 1,
        idPersona: {
            idPersona: 1,
            nombres: "Juan",
            apellidos: "Pérez",
            tipoDocumento: TipoDocumento.CC,
            numeroDocumento: "123456789",
            fechaNacimiento: new Date("1995-11-07"),
            genero: Generos.MASCULINO,
            ciudadResidencia: "Bogotá",
            celular: 3001234567,
            correo: "jp@gmail.com",
            eps: "Salud Total",
            nombresContactoEmergencia: "Estela Florez",
            celularContactoEmergencia: 3132584545,
            contrasena: "123456",
            idEstado: EstadoPersona.ACTIVO
        },
        fechaRegistro: new Date("2025-12-12"),
        rol: RolPersona.PACIENTE
    };

    const calculateAge = (birthDate: Date): number => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    const agePatient = calculateAge(patient.idPersona.fechaNacimiento);

    return (
        <section className="m-auto grid grid-cols-4 w-3/4 bg-[#f1faee] p-6">
            <p className="font-bold text-cyan-700">Nombres:</p>
            <p className="text-cyan-700">{patient.idPersona.nombres}</p>

            <p className="font-bold text-cyan-700">Apellidos:</p>
            <p className="text-cyan-700">{patient.idPersona.apellidos}</p>

            <p className="font-bold text-cyan-700">Edad:</p>
            <p className="text-cyan-700">{agePatient} años</p>

            <p className="font-bold text-cyan-700">Tipo de documento:</p>
            <p className="text-cyan-700">{patient.idPersona.tipoDocumento}</p>

            <p className="font-bold text-cyan-700">Número de documento:</p>
            <p className="text-cyan-700">{patient.idPersona.numeroDocumento}</p>

            <p className="font-bold text-cyan-700">EPS:</p>
            <p className="text-cyan-700">{patient.idPersona.eps}</p>

            <p className="font-bold text-cyan-700">Celular:</p>
            <p className="text-cyan-700">{patient.idPersona.celular}</p>

            <p className="font-bold text-cyan-700">Diagnóstico:</p>
            <p className="text-cyan-700">No disponible</p>
        </section>
    );
}