import Navbar from "../../components/Navbar";
import DetailsMedicalCard from "../../components/DetailsMedicalCard";
import NavButton from "../../components/NavButton";
import PatientDataSummary from "../../components/PatientDataSummary";

//TODO: Traer los datos de la historia clínica
export default function DetailsMedicalHistory() {
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

        <PatientDataSummary/>  
        <DetailsMedicalCard />
    </div>
  );
}