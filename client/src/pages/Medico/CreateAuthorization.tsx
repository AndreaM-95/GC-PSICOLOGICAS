import Navbar from "../../components/Navbar";
import 'primeicons/primeicons.css';
import PatientDataSummary from "../../components/PatientDataSummary";
import ProfessionalSignature from "../../components/ProfessionalSignature";
import InputDropdown from "../../components/InputDropdown";
import { useState } from "react";
import CompInputTextArea from "../../components/CompInputTextArea";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import NavButton from "../../components/NavButton";

interface CreateAuthorizationProps {
    idAuth?: number;
    creationDate: Date;
    expirationDate: Date;
    authState: string;
    medicine?: [{
        typeMedicine: string [];
        dosageMedication: string [];
        authObservation: string [];
    }][];
}

export default function CreateAuthorization(){
    const [typeMedicine, setTipoMedicamento] = useState("");
    const [dosageMedication, setDosageMedication] = useState("");
    const [authObservation, setAuthObservation] = useState("");

    const initialState: CreateAuthorizationProps = {
        idAuth: undefined,
        creationDate: new Date(),
        expirationDate: new Date(),
        authState: "",
        medicine: []
    };

    const [authData, setAuthData] = useState<CreateAuthorizationProps>(initialState);

    const typeMedicineOptions = [
        { id: 1, name: "Sertralina" },
        { id: 2, name: "Fluoxetina" },
        { id: 3, name: "Paroxetina" },
    ];

    const dosageMedicationOptions = [
        { id: 1, name: "20mg" },
        { id: 2, name: "40mg" },
        { id: 3, name: "60mg" },
    ];

    const CreateAuthorizationForm= () => {
        //TODO: Crear formulario de autorización
    }

    return(
        <main>
            <Navbar/>
            <header className="m-auto w-3/4">
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Crear autorización de medicamentos</h1>
            </header>
            <PatientDataSummary/>
            <section className="w-3/4 bg-[#f1faee] m-auto py-4 mb-4">
                <Divider/>
                <form onSubmit={CreateAuthorizationForm} aria-labelledby="autorizathion-title">
                    <h2 className="font-bold text-cyan-700 pl-6">1. Vigencia y estado de la autorización</h2>

                    <div className="w-full grid grid-cols-3 px-6 pt-2 items-center">
                        <div>
                            <label htmlFor="fecha-creacion" className="block text-cyan-700 mb-2">Fecha de creación:</label>
                            <InputText id="fecha-creacion" value={authData.creationDate.toLocaleDateString()} disabled readOnly />
                        </div>
                        <div>
                            <label htmlFor="fecha-expiracion" className="block text-cyan-700 mb-2">Fecha de expiración:</label>
                            <InputText id="fecha-expiracion" value={authData.expirationDate.toLocaleDateString()} disabled readOnly />
                        </div>
                        <div>
                            <label htmlFor="estado-autorizacion" className="block text-cyan-700 mb-2">Estado de la autorización:</label>
                            <InputText id="estado-autorizacion" value={authData.authState} placeholder="Activa" disabled readOnly />
                        </div>
                    </div>
                    <Divider/>
                    <h2 className="font-bold text-cyan-700 pl-6">2. Medicamentos</h2>
                    <div className="w-full grid grid-cols-3 pl-2">
                        <InputDropdown id="tipo-medicamento" textField="Tipo de Medicamento:"  dataDrops={typeMedicineOptions} value={typeMedicine} onChange={setTipoMedicamento} />
                        
                        <InputDropdown id="dosage-medicamento" textField="Dosis de Medicamento:"  dataDrops={dosageMedicationOptions} value={dosageMedication} onChange={setDosageMedication} />

                        <CompInputTextArea
                            id="observaciones-autorizacion"
                            textField="Observaciones:"
                            value={authObservation}
                            onChange={setAuthObservation}
                            rows={1}
                        />
                    </div>
                    <div className="flex content-center pl-6 mt-2">
                        <Button icon="pi pi-plus" className="p-0" rounded onClick={() => {}}/>
                        <p className="text-cyan-700 content-center pl-2">¿Agregar otro medicamento?</p>
                    </div>

                    <ProfessionalSignature signature="/firma.png" name="Camilo Rodríguez" specialty="Psicología" licenseNumber="123456" document="123456789"/>
                    <Divider/>
                    <div className="flex justify-end w-full gap-4 mt-2 mx-auto pb-4 pr-6">
                        <NavButton icon="pi pi-check" label="Crear autorización" btnFunction={CreateAuthorizationForm} type={"submit"} />
                        <NavButton label="Cancelar" btnFunction={()=>{}} type="button"/>
                    </div>
                </form>
            </section>
        </main>
    );
}