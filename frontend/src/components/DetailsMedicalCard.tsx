import { Divider } from "primereact/divider";
import { ScrollPanel } from "primereact/scrollpanel";

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

export default function DetailsMedicalCard() {

    const consultas: InfoConsulta[] = [
        {
            fechaConsulta: new Date(),
            horaConsulta: new Date(),
            motivoConsulta: "Consulta de rutina",
            antecedentesMedicos: "Ninguno",
            antecedentesFamiliares: "Ninguno",
            antecedentesPsicológicos: "Ninguno",
            consumoMedicamentos: "Ninguno",
            estadoAnimo: "Estable",
            escalaRiesgo: 0,
            observacionesIniciales: "Ninguna",
            tipoIntervencion: "Psicoterapia",
            frecuenciaSesiones: "Semanal"
        },
        {
            fechaConsulta: new Date(),
            horaConsulta: new Date(),
            motivoConsulta: "Consulta de rutina",
            antecedentesMedicos: "Ninguno",
            antecedentesFamiliares: "Ninguno",
            antecedentesPsicológicos: "Ninguno",
            consumoMedicamentos: "Ninguno",
            estadoAnimo: "Estable",
            escalaRiesgo: 0,
            observacionesIniciales: "Ninguna",
            tipoIntervencion: "Psicoterapia",
            frecuenciaSesiones: "Semanal"
        }
    ];


    return(
        <div className="m-auto w-3/4 bg-[#f1faee] px-6 pb-4">
            <ScrollPanel style={{ height: '400px' }}>
                {consultas.map((consulta, index) => (
                    <div key={index}>
                        <Divider/>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="font-bold text-cyan-700">Fecha y hora:</p>
                            <p className="text-cyan-700">{consulta.fechaConsulta.toLocaleDateString()} | {consulta.horaConsulta.toLocaleTimeString()}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <h3 className="font-bold text-cyan-700">1. Motivo de la consulta</h3>
                            <p className="text-cyan-700">{consulta.motivoConsulta}</p>
                        </div>
                        
                        <h3 className="font-bold mt-4 text-cyan-700">2. Antecedentes personales y familiares</h3>
                        <div className="grid grid-cols-2">
                            <p className="font-bold text-cyan-700">Antecedentes médicos relevantes:</p>
                            <p className="text-cyan-700">{consulta.antecedentesMedicos}</p>
                            <p className="font-bold text-cyan-700">Antecedentes familiares de trastornos mentales:</p>
                            <p className="text-cyan-700">{consulta.antecedentesFamiliares}</p>
                            <p className="font-bold text-cyan-700">Antecedentes psicológicos o psiquiátricos:</p>
                            <p className="text-cyan-700">{consulta.antecedentesPsicológicos}</p>
                            <p className="font-bold text-cyan-700">Consumo de medicamentos actuales:</p>
                            <p className="text-cyan-700">{consulta.consumoMedicamentos}</p>
                        </div>
                        
                        <h3 className="font-bold mt-4 text-cyan-700">3. Evaluación psicológica inicial</h3>
                        <div className="grid grid-cols-2">
                            <p className="font-bold text-cyan-700">Estado de ánimo actual:</p>
                            <p className="text-cyan-700">{consulta.estadoAnimo}</p>
                            <p className="font-bold text-cyan-700">Escala de riesgo suicida:</p>
                            <p className="text-cyan-700">{consulta.escalaRiesgo}</p>
                            <p className="font-bold text-cyan-700">Observaciones iniciales del profesional:</p>
                            <p className="text-cyan-700">{consulta.observacionesIniciales}</p>
                        </div>

                        <h3 className="font-bold mt-4 text-cyan-700">4. Plan de Intervención</h3>
                        <div className="grid grid-cols-2">
                            <p className="font-bold text-cyan-700">Tipo de intervención propuesta:</p>
                            <p className="text-cyan-700">{consulta.frecuenciaSesiones}</p>

                            <p className="font-bold text-cyan-700">Frecuencia de sesiones:</p>
                            <p className="text-cyan-700">{consulta.frecuenciaSesiones}</p>
                        </div>
                    </div>
                ))}
            </ScrollPanel>
        </div>
    )
}