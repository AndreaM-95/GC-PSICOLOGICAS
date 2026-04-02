import { useState } from "react";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { Divider } from "primereact/divider";
import { AutoComplete } from "primereact/autocomplete";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { allPatientAppointmentsRequest } from "@/services/appointments.service";
import { usePatientsData } from "@/hooks/usePatientsData";
import { useAppToast } from "@/hooks/useAppToast";
import { usePatientSearch } from "@/hooks/usePatientSearch";

export default function ListarCitas() {
    const { toast, showMessage } = useAppToast();
    const [documentPatient, setDocumentPatient] = useState<string>("");
    const [appointmentsPatient, setAppointmentsPatient] = useState<any[]>([]);
    const { patients } = usePatientsData(showMessage); // Cargar pacientes al montar el componente
    const { filteredPatients, searchPatient } = usePatientSearch(patients);
    
    /**
     * @description Selección del paciente y visualización de sus citas
     * @param e 
     */
    const onPatientSelect = (e: { value: any }) => {
        const selected = e.value;
        loadPatientAppointments(selected.numeroDocumento);
    };
    
    /**
     * @description Carga las citas de un paciente en un orden específico <Confirmada | Asistida | Cancelada | No asistida
     * @param document Número de documento del paciente
     */
    const loadPatientAppointments = async (document: string) => {
        try {
            const response = await allPatientAppointmentsRequest(parseInt(document));
            // Orden personalizado
            const statusOrder: Record<string, number> = {
                "Confirmada": 1,
                "Asistida": 2,
                "Cancelada": 3,
                "No asistida": 4
            };

            const sortedAppointments = response.citas.sort(
                (a: any, b: any) => statusOrder[a.estado] - statusOrder[b.estado]
            );

            setAppointmentsPatient(sortedAppointments);

        } catch (err: any) {
            console.error("Error cargando citas:", err);
            setAppointmentsPatient([]);
            showMessage("error", "Error al cargar las citas del paciente.")
        }
    };
     
    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width:'100%' }} >
            <Toast ref={toast} />

            <div className="w-full flex justify-center">
                <AutoComplete
                    id="documentPatient"
                    value={documentPatient}
                    suggestions={filteredPatients}
                    completeMethod={searchPatient}
                    field="numeroDocumento"
                    onChange={(e) => setDocumentPatient(e.value)}
                    onSelect={onPatientSelect}
                    placeholder="Ingrese documento del paciente"
                    aria-label="Buscar paciente por documento"
                    dropdown
                    className="col-span-2"
                />
            </div>

            <Divider className="col-span-2"/>
            
            <div className="card">
                {appointmentsPatient.length > 0 ? (
                    <DataTable 
                        value={appointmentsPatient} 
                        selectionMode="single"
                        dataKey="idCita"
                        responsiveLayout="scroll"
                        emptyMessage="No se encontraron citas activas"
                    >
                        <Column field="idCita" header="COD"  style={{color: '#49A7CC'}}></Column>
                        <Column field="estado" header="Estado" style={{color: '#49A7CC'}}></Column>
                        <Column 
                            field="fechaCita" 
                            header="Fecha" 
                            
                            style={{color: '#49A7CC'}}
                        ></Column>
                        <Column field="horaCita" header="Hora" style={{color: '#49A7CC'}}></Column>
                        <Column field="profesional" header="Profesional"  style={{color: '#49A7CC'}}></Column>
                        <Column field="modalidad" header="Modalidad"  style={{color: '#49A7CC'}}></Column>
                        <Column field="consultorio" header="Consultorio"  style={{color: '#49A7CC'}}></Column>
                    </DataTable>
                ): (
                    <Card className="text-center">
                        <div className="flex text-center align-items-center justify-content-center">
                            <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                            <h3>No hay registro de citas</h3>
                        </div>
                    </Card>
                )}
            </div>
        </Card>
    );
}