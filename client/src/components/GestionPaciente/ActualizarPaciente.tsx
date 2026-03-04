import { useAppToast } from "@/hooks/useAppToast";
import { updatePatientRequest } from "@/services/patient.service";
import PacienteForm from "./PacienteForm";
import { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { usePatientsData } from "@/hooks/usePatientsData";
import { usePatientSearch } from "@/hooks/usePatientSearch";
import type { IActualizarPersona } from "@/types";

export default function ActualizarPaciente() {
    const { showMessage } = useAppToast();
    const [documentPatient, setDocumentPatient] = useState("");
    const {patients, loadPatients} = usePatientsData(showMessage);
    const { filteredPatients, searchPatient } = usePatientSearch(patients);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    const handleUpdate = async (data: IActualizarPersona) => {
        try {
            await updatePatientRequest(selectedPatient.id, data);

            showMessage("success", "Paciente actualizado correctamente.");
            await loadPatients();

        } catch (error: any) {
            const backendMessage =
                error.response?.data?.message?.message ||
                "Error inesperado";

            showMessage("error", backendMessage);
        }
    };
    /**
     * @description Selección del paciente y visualización de su nombre en el input
     * @param e 
     */
    const onPatientSelect = (e: { value: any }) => {
        const selected = e.value;
        setSelectedPatient(selected);
        setDocumentPatient(selected.numeroDocumento);
    };

    return (
        <div className="w-full flex flex-col justify-center gap-4">
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
                className="w-1/2 m-auto"
            />
            { selectedPatient != null ?
                <PacienteForm
                    mode="edit"
                    initialData={selectedPatient}
                    onSubmit={handleUpdate}
                />
                : <div className="flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round">
                    <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                    <h3>Seleccione un paciente</h3>
                </div>
            }
        </div>
    );
}