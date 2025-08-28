import InfoUserCard from "../../components/InfoUserCard";
import Navbar from "../../components/Navbar";
import StoryHistory from "../../components/StoryHistory";
import NavButton from "../../components/NavButton";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";

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

export default function SearchMedicalHistory() {
    return (
        <div className="pb-8">
            <Navbar />
            <div className="m-auto w-[85%]">
                <h1 className="text-cyan-700 font-bold text-2xl mt-8 mb-2">Historia clínica</h1>
                <h3 className="text-cyan-700 font-bold text-lg mb-2">Envía la información de la historia clínica al correo registrado del paciente</h3>
            </div>

            <div className="w-[85%] m-auto mb-4">
                <InputText placeholder="Busca a un paciente.." keyfilter="alphanum" />
                <Avatar icon="pi pi-search" size="large" style={{background: 'white'}} />
            </div>
                        
            <InfoUserCard patient={patient} />

            <div className="m-auto w-[85%] flex justify-end gap-3 py-3">
                <NavButton icon="pi pi-send" label="Enviar al correo" btnFunction={() => {}} />
                <NavButton label="Volver" btnFunction={() => {}} />
            </div>

            <StoryHistory/>
        </div>
    )
}