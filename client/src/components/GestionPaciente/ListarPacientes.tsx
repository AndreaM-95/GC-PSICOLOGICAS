import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { useAppToast } from "@/hooks/useAppToast"; 
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getPatients } from "@/services/patient.service";
import { ScrollPanel } from "primereact/scrollpanel";

export default function ListarPacientes() {
    const { toast, showMessage } = useAppToast();
    const [patients, setPatients] = useState<any[]>([]);

    useEffect(() => {
        loadPatientActives();
    }, []);
    
    /**
     * @description Carga la lista de pacientes activos desde el backend. Realiza una solicitud para obtener los pacientes y actualiza el estado con los datos recibidos. Si ocurre un error durante la carga, muestra un mensaje de error.
     */
    const loadPatientActives = async () => {
        try {
            const pats = await getPatients();
            setPatients(pats);
        } catch (err) {
            showMessage("error", "Error al cargar los pacientes");
        }
    };

    return(
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width:'100%' }} >
            <Toast ref={toast} />
            <ScrollPanel style={{ height: '450px' }}>
                <DataTable value={patients} tableStyle={{ minWidth: '50rem', color: 'var(--color-cyan-700)' }}>
                    <Column field="nombres" header="Nombres" />
                    <Column field="apellidos" header="Apellidos" />
                    <Column field="tipoDocumento" header="TD" />
                    <Column field="numeroDocumento" header="# Documento" />
                    <Column field="ciudadResidencia" header="Ciudad" />
                    <Column field="celular" header="Teléfono" />
                    <Column field="nombresContactoEmergencia" header="Nombre CE" />
                    <Column field="celularContactoEmergencia" header="Número CE" />
                </DataTable>
            </ScrollPanel>
        </Card>
    )
}