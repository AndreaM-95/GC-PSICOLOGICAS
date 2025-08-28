import { ScrollPanel } from "primereact/scrollpanel";
import Navbar from "../../components/Navbar";
import NavButton from "../../components/NavButton";
import PatientDataSummary from "../../components/PatientDataSummary";
import { Divider } from "primereact/divider";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

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

interface SessionFrequency{
    id: number;
    name: string;
}

export default function CreateMedicalHistory() {
    const [reasonAppoinment, setReasonAppoinment] = useState<InfoConsulta | null>(null);
    const [typeIntervention, setTypeIntervention] = useState<InfoConsulta | null>(null);
    const [medicalHistory, setMedicalHistory] = useState<InfoConsulta | null>(null);
    const [familyHistory, setFamilyHistory] = useState<InfoConsulta | null>(null);
    const [mentalHistory, setMentalHistory] = useState<InfoConsulta | null>(null);
    const [mood, setMood] = useState<InfoConsulta | null>(null);
    const [riskScale, setRiskScale] = useState<InfoConsulta | null>(null);
    const [observation, setObservation] = useState<InfoConsulta | null>(null);
    const [selectedSessionFrequency, setSelectedSessionFrequency] = useState<SessionFrequency | null>(null);

    const getInitialMedicalHistory = (): InfoConsulta => ({
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
        frecuenciaSesiones: selectedSessionFrequency ? selectedSessionFrequency.name : "",
    });

    const medicalHis = [
        {id: 1, name: "Diabetes"},
        {id: 2, name: "Hipertensión"},
        {id: 3, name: "Asma"},
    ];

    const familyHis = [
        {id: 1, name: "Diabetes"},
        {id: 2, name: "Hipertensión"},
        {id: 3, name: "Asma"},
    ];

    const moodPatient = [
        {id: 1, name: "Miedo"},
        {id: 2, name: "Rabia"},
        {id: 3, name: "Tristeza"},
        {id: 4, name: "Alegría"},
        {id: 5, name: "Desagrado"},
        {id: 6, name: "Neutral"}
    ];

    const riskScalePatient = [
        {id: 1, name: 1},
        {id: 2, name: 2},
        {id: 3, name: 3},
        {id: 4, name: 4},
        {id: 5, name: 5}
    ];

    const mentalHis = [
        {id: 1, name: "Depresión"},
        {id: 2, name: "Ansiedad"},
        {id: 3, name: "Estrés Postraumático"},
    ];


    const sessionFrequency: SessionFrequency[] = [
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
        <div className="pb-8">
            <Navbar />
            <div className="m-auto w-3/4">
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Detalles de la historia clínica</h1>
            </div>
            <PatientDataSummary/>

            <div className="m-auto w-3/4 shadow-md p-6 pb-4 mt-4">
                <ScrollPanel content={JSON.stringify(getInitialMedicalHistory())} style={{ height: '400px' }}>
                    <div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="font-bold text-cyan-700">Fecha y hora:</p>
                            <p className="text-cyan-700">{getInitialMedicalHistory().fechaConsulta.toLocaleDateString()} | {getInitialMedicalHistory().horaConsulta.toLocaleTimeString()}</p>
                        </div>

                        <Divider/>
                        <div className="mt-4 pr-4">
                            <h3 className="font-bold text-cyan-700">1. Motivo de la consulta</h3>
                            <InputTextarea id="username" value={reasonAppoinment} onChange={(e) => setReasonAppoinment(e.value)} rows={3} cols={30} className="w-full"/>
                        </div>
                        
                        <Divider/>
                        <h3 className="font-bold mt-4 text-cyan-700">2. Antecedentes personales y familiares</h3>
                        <div className="grid grid-cols-2 gap-2 pr-4">
                            <p className="text-cyan-700 content-center">Antecedentes médicos relevantes:</p>
                            <Dropdown value={medicalHistory} onChange={(e) => setMedicalHistory(e.value)} options={medicalHis} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" />

                            <p className="text-cyan-700">Antecedentes familiares de trastornos mentales:</p>
                            <Dropdown value={familyHistory} onChange={(e) => setFamilyHistory(e.value)} options={mentalHis} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" />

                            <p className="text-cyan-700">Antecedentes psicológicos o psiquiátricos:</p>
                            <Dropdown value={mentalHistory} onChange={(e) => setMentalHistory(e.value)} options={mentalHis} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" />

                            <p className="text-cyan-700">Consumo de medicamentos actuales:</p>
                            <InputTextarea id="username" value={reasonAppoinment} onChange={(e) => setReasonAppoinment(e.value)} rows={3} cols={30}/>
                        </div>
                        
                        <Divider/>
                        <h3 className="font-bold mt-4 text-cyan-700">3. Evaluación psicológica inicial</h3>
                        <div className="grid grid-cols-2 gap-2 pr-4">
                            <p className="text-cyan-700">Estado de ánimo actual:</p>
                            <Dropdown value={mood} onChange={(e) => setMood(e.value)} options={moodPatient} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" />

                            <p className="text-cyan-700">Escala de riesgo suicida:</p>
                            <Dropdown value={riskScale} onChange={(e) => setRiskScale(e.value)} options={riskScalePatient} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" />

                            <p className="text-cyan-700">Observaciones iniciales del profesional:</p>
                            <InputTextarea id="username" value={observation} onChange={(e) => setObservation(e.value)} rows={3} cols={30} className="w-full"/>
                        </div>

                        <Divider/>
                        <h3 className="font-bold mt-4 text-cyan-700">4. Plan de Intervención</h3>
                        <div className="grid grid-cols-2 gap-2 pr-4">
                            <p className="text-cyan-700">Tipo de intervención propuesta:</p>
                            <InputTextarea id="username" value={typeIntervention} onChange={(e) => setTypeIntervention(e.target.value)} rows={3} cols={30} />

                            <p className="text-cyan-700 content-center">Frecuencia de sesiones:</p>
                            <Dropdown value={selectedSessionFrequency} onChange={(e) => setSelectedSessionFrequency(e.value)} options={sessionFrequency} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" />
                        </div>

                        <Divider/>
                        <h3 className="font-bold mt-4 text-cyan-700">5. Registro del Profesional</h3>
                        <div className="grid grid-cols-2 gap-2 pr-4">
                            <p className="text-cyan-700 content-center">Nombre del psicólogo:</p>
                            <InputText id="username" value={"Camilo Rodríguez"} disabled/>

                            <p className="text-cyan-700 content-center">No. tarjeta profesional:</p>
                            <InputText id="username" value={"123456"} disabled/>

                            <p className="text-cyan-700 content-center">Firma del profesional:</p>
                            <img src="/firma.png" width="250" height="250" alt="Registro" />
                        </div>
                    </div>
                </ScrollPanel>
            </div>
    
            <div className="flex justify-end w-3/4 gap-4 mt-2 mx-auto pb-4">
                <NavButton icon="pi pi-check" label="Crear" btnFunction={createHistory} />
                <NavButton label="Cancelar" btnFunction={returnToPage} />
            </div>
        </div>
    );
}