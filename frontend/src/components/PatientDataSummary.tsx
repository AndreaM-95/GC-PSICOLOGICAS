
interface InfoPatient {
  id: string;
  name: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  age: number;
  eps: string;
  cel: number;
  diagnostic: string;
}

export default function PatientDataSummary() {

    // TODO: Replace this with real data fetching logic
    const patient: InfoPatient = {
        id: "1",
        name: "Juan",
        lastName: "Pérez",
        documentType: "CC",
        documentNumber: "123456789",
        age: 30,
        eps: "Salud Total",
        cel: 3001234567,
        diagnostic: "Sin diagnóstico",
    };

    return (
        <section className="m-auto grid grid-cols-4 w-3/4 bg-[#f1faee] p-6">
            <p className="font-bold text-cyan-700">Nombres:</p>
            <p className="text-cyan-700">{patient.name}</p>

            <p className="font-bold text-cyan-700">Apellidos:</p>
            <p className="text-cyan-700">{patient.lastName}</p>

            <p className="font-bold text-cyan-700">Edad:</p>
            <p className="text-cyan-700">{patient.age}</p>

            <p className="font-bold text-cyan-700">Tipo de documento:</p>
            <p className="text-cyan-700">{patient.documentType}</p>

            <p className="font-bold text-cyan-700">Número de documento:</p>
            <p className="text-cyan-700">{patient.documentNumber}</p>

            <p className="font-bold text-cyan-700">EPS:</p>
            <p className="text-cyan-700">{patient.eps}</p>

            <p className="font-bold text-cyan-700">Celular:</p>
            <p className="text-cyan-700">{patient.cel}</p>

            <p className="font-bold text-cyan-700">Diagnóstico:</p>
            <p className="text-cyan-700">{patient.diagnostic}</p>
        </section>
    );
}