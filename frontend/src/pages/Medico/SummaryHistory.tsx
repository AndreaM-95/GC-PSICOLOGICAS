import InfoUserCard from "../../components/InfoUserCard";
import Navbar from "../../components/Navbar";
import StoryHistory from "../../components/StoryHistory";
import NavButton from "../../components/NavButton";

const patient = {
    nameUser: "John",
    lastNameUser: "Doe",
    documentType: "CC",
    documentNumber: 123456789,
    birthdate: new Date("1990-01-01"),
    genere: "Masculino",
    cityResidence: "Bogotá",
    celphone: 3001234567,
    email: "john.doe@example.com",
    eps: "EPS Sura",
    nameEmergencyContact: "Jane Doe",
    phoneEmergencyContact: 3007654321,
    state: "Activo",
    years: 34, // example value
    address: "Calle 123 #45-67, Bogotá", // example value
    diagnostic: "Bipolar" // example value
};

export default function SummaryHistory() {
    return (
        <div className="pb-8">
            <Navbar />
            <div className="m-auto w-[85%]">
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Historia clínica</h1>
            </div>
                        
            <InfoUserCard patient={patient} />

            <div className="m-auto w-[85%] flex justify-end gap-3 py-3">
                <NavButton label="Crear historia" icon="pi pi-plus" btnFunction={() => {}} />
            </div>

            <StoryHistory/>
        </div>
    )
}