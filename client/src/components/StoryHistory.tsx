import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ScrollPanel } from "primereact/scrollpanel";
import '../App.css'
import NavButton from "./NavButton";
import { useNavigate } from 'react-router-dom';


export default function StoryHistory() {
    const navigate = useNavigate();
    //TODO: Reemplazar con información de la BDD
    const history = [
        {
            date: "2023-03-01",
            professional: "Dr. Smith",
            reason: "Anxiety",
            diagnostic: "Generalized Anxiety Disorder",
            treatment: "Cognitive Behavioral Therapy"
        },
        {
            date: "2023-03-15",
            professional: "Dr. Johnson",
            reason: "Depression",
            diagnostic: "Major Depressive Disorder",
            treatment: "Antidepressants"
        },
        {
            date: "2023-03-30",
            professional: "Dr. Lee",
            reason: "Stress",
            diagnostic: "Adjustment Disorder",
            treatment: "Mindfulness Techniques"
        },
        {
            date: "2023-04-05",
            professional: "Dr. Taylor",
            reason: "Burnout",
            diagnostic: "Occupational Burnout",
            treatment: "Stress Management Techniques"
        }
    ]

    return (
        <Card
        className="mt-2"
            style={{padding: '0px', width: '85%', margin:'auto', marginTop: '20px'}}
        >
            <div className="flex justify-start gap-3 pb-3">
                <NavButton type={"button"} label="Ver detalle completo" icon="pi pi-eye" btnFunction={() => {navigate('/detailsMedicalHistory');}} />
            </div>

            <ScrollPanel style={{ height: '200px' }}>
                <DataTable value={history} tableStyle={{ minWidth: '50rem', color: 'var(--color-cyan-700)' }}>
                    <Column field="date" header="Fecha" style={{backgroundColor: '#f1faee', color:'var(--color-cyan-700)'}}></Column>
                    <Column field="professional" header="Profesional" style={{backgroundColor: '#f1faee', color:'var(--color-cyan-700)'}}></Column>
                    <Column field="reason" header="Motivo" style={{backgroundColor: '#f1faee', color:'var(--color-cyan-700)'}}></Column>
                    <Column field="diagnostic" header="Diagnóstico" style={{backgroundColor: '#f1faee', color:'var(--color-cyan-700)'}}></Column>
                    <Column field="treatment" header="Tratamiento" style={{backgroundColor: '#f1faee', color: 'var(--color-cyan-700)'}}></Column>
                </DataTable>
            </ScrollPanel>
        </Card>
    );
}