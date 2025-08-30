import { ScrollPanel } from "primereact/scrollpanel";
import Navbar from "../../components/Navbar";
import NavButton from "../../components/NavButton";
import PatientDataSummary from "../../components/PatientDataSummary";
import { Divider } from "primereact/divider";
import { useState } from "react";
import ProfessionalSignature from "../../components/ProfessionalSignature";
import InputDropdown from "../../components/InputDropdown";
import CompInputTextArea from "../../components/CompInputTextArea";

interface InfoConsulta {
    fechaConsulta: Date;
    horaConsulta: Date;
    motivoConsulta: string;
    antecedentesMedicos: string;
    antecedentesFamiliares: string;
    antecedentesPsicológicos: string;
    consumoMedicamentos: string;
    estadoAnimo: string;
    escalaRiesgo: number;
    observacionesIniciales: string;
    tipoIntervencion: string;
    frecuenciaSesiones: string;
}


export default function CreateMedicalHistory() {
    const [reasonAppoinment, setReasonAppoinment] = useState<string>("");       //Motivo de la cita
    const [observation, setObservation] = useState<string>("");                 //Observaciones iniciales
    const [mentalHistory, setMentalHistory] = useState<string>("");             //Antecedentes psicológicos o psiquiátricos
    const [pathologyHistory, setPathologyHistory] = useState<string>("");       //Antecedentes de patologías
    const [surgicalHistory, setSurgicalHistory] = useState<string>("");         //Antecedentes quirúrgicos
    const [pharmacologicalHistory, setPharmacologicalHistory] = useState<string>(""); //Antecedentes farmacológicos
    const [familyHistory, setFamilyHistory] = useState<string>("");             //Antecedentes familiares
    const [mentalExam, setMentalExam] = useState<string>("");                   //Exámen mental
    const [analysis, setAnalysis] = useState<string>("");                       //Análisis
    const [riskScale, setRiskScale] = useState<string>("");                     //Escala nivel suicida
    const [typeIntervention, setTypeIntervention] = useState<string>("");       //Tipo de intervención
    const [sessionFrequency, setSessionFrequency] = useState<string>("");       //Frecuencia de sesiones
    
    const initialState: InfoConsulta = {
        fechaConsulta: new Date(),
        horaConsulta: new Date(),
        motivoConsulta: "",
        antecedentesMedicos: "",
        antecedentesFamiliares: "",
        antecedentesPsicológicos: "",
        consumoMedicamentos: "",
        estadoAnimo: "",
        escalaRiesgo: 0,
        observacionesIniciales: "",
        tipoIntervencion: "",
        frecuenciaSesiones: ""
    };
    const [medicalHistory, setMedicalHistory] = useState<InfoConsulta>(initialState);

    const pathologyOptions = [
        {id: 1, name: "Diabetes"},
        {id: 2, name: "Hipertensión"},
        {id: 3, name: "Asma"},
    ];

    const surgicalOptions = [
        {id: 1, name: "Apendicitis"},
        {id: 2, name: "Colecistectomía"},
        {id: 3, name: "Cirugía de rodilla"},
    ];

    const pharmacologicalOptions = [
        {id: 1, name: "Antidepresivos"},
        {id: 2, name: "Ansiolíticos"},
        {id: 3, name: "Estabilizadores del ánimo"},
    ];

    const familyHist = [
        {id: 1, name: "Diabetes"},
        {id: 2, name: "Hipertensión"},
        {id: 3, name: "Asma"},
    ];

    const riskScaleOptions = [
        {id: 1, name: "Bajo"},
        {id: 2, name: "Moderado"},
        {id: 3, name: "Alto"},
    ];

    const mentalHis = [
        {id: 1, name: "Depresión"},
        {id: 2, name: "Ansiedad"},
        {id: 3, name: "Estrés Postraumático"},
    ];

    const sessionFrequencyOptions = [
        { id: 1, name: "Semanal" },
        { id: 2, name: "Quincenal" },
        { id: 3, name: "Mensual" }
    ];

    const createHistory = () => {
        // TODO: Implement create history logic
    };

    const returnToPage = () => {
        // TODO: Implement return to previous page logic
    };

    return (
        <main className="pb-8">
            <Navbar />
            <header className="m-auto w-3/4">
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Detalles de la historia clínica</h1>
            </header>
            <PatientDataSummary/>

            <form>
                <div className="m-auto w-3/4 shadow-md p-6 pb-4 mt-4">
                    <ScrollPanel style={{ height: '400px' }}>
                        <div>
                            <div className="grid grid-cols-2 gap-2">
                                <p className="font-bold text-cyan-700">Fecha y hora:</p>
                                <p className="text-cyan-700 text-end px-2">{medicalHistory.fechaConsulta.toLocaleDateString()} | {medicalHistory.horaConsulta.toLocaleTimeString()}</p>
                            </div>
                            <Divider/>
                            <h3 className="font-bold text-cyan-700">1. Motivo</h3>
                            <CompInputTextArea textField="1. Motivo de la consulta" value={reasonAppoinment} onChange={setReasonAppoinment} />

                            <Divider/>
                            <h3 className="font-bold mt-4 text-cyan-700">2. Historia del problema</h3>
                            <CompInputTextArea textField="Observaciones iniciales:" value={observation} onChange={setObservation}/>

                            <InputDropdown dataDrops={mentalHis} textField="Antecedentes psicológicos o psiquiátricos:" value={mentalHistory} onChange={setMentalHistory}/>

                            <Divider/>
                            <h3 className="font-bold mt-4 text-cyan-700">3 Antecedentes médicos</h3>
                            <InputDropdown dataDrops={pathologyOptions} textField="Antecedentes patológicos:" value={pathologyHistory} onChange={setPathologyHistory}/>

                            <InputDropdown dataDrops={surgicalOptions} textField="Antecedentes quirúrgicos:" value={surgicalHistory} onChange={setSurgicalHistory}/>

                            <InputDropdown dataDrops={pharmacologicalOptions} textField="Antecedentes farmacológicos:" value={pharmacologicalHistory} onChange={setPharmacologicalHistory}/>

                            <InputDropdown dataDrops={familyHist} textField="Antecedentes familiares:" value={familyHistory} onChange={setFamilyHistory}/>

                            <Divider/>
                            <h3 className="font-bold mt-4 text-cyan-700">4. Evaluación psicológica inicial</h3>
                            <CompInputTextArea textField="Exámen mental:" value={mentalExam} onChange={setMentalExam} />

                            <CompInputTextArea textField="Análisis:" value={analysis} onChange={setAnalysis} />

                            <InputDropdown dataDrops={riskScaleOptions} textField="Escala de riesgo suicida:" value={riskScale} onChange={setRiskScale}/>

                            <Divider/>
                            <h3 className="font-bold mt-4 text-cyan-700">5. Plan de Intervención</h3>
                            <CompInputTextArea textField="Plan de manejo:" value={typeIntervention} onChange={setTypeIntervention} />

                            <InputDropdown dataDrops={sessionFrequencyOptions} textField="Frecuencia de sesiones:" value={sessionFrequency} onChange={setSessionFrequency}/>
                        </div>
                        <ProfessionalSignature signature="/firma.png" name="Camilo Rodríguez" specialty="Psicología" licenseNumber="123456" document="123456789"/>
                    </ScrollPanel>
                </div>
                <div className="flex justify-end w-3/4 gap-4 mt-2 mx-auto pb-4">
                    <NavButton icon="pi pi-check" label="Crear" btnFunction={createHistory} type={"submit"} />
                    <NavButton label="Cancelar" btnFunction={returnToPage} type="button"/>
                </div>
            </form>
        </main>
    );
}