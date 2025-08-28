
//TODO: Traer los datos de la historia clínica

import Navbar from "../../components/Navbar";
import DetailsMedicalCard from "../../components/DetailsMedicalCard";
import NavButton from "../../components/NavButton";


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

export default function DetailsMedicalHistory() {
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

  const sendHistoryByEmail = () => {
    // TODO: Implement email sending logic
  };

  const returnToPage = () => {
    // TODO: Implement return to previous page logic
  };


  return (
    <div className="pb-8">
        <Navbar />
        <div className="m-auto w-3/4">
            <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Detalles de la historia clínica</h1>
        </div>

        <div className="flex justify-end w-3/4 gap-4 mt-2 mx-auto pb-4">
            <NavButton icon="pi pi-send" label="Enviar al correo" btnFunction={sendHistoryByEmail} />
            <NavButton label="Volver" btnFunction={returnToPage} />
        </div>

        <div className="m-auto grid grid-cols-4 w-3/4 bg-[#f1faee] p-6">
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
        </div>
        <DetailsMedicalCard />
    </div>
  );
}