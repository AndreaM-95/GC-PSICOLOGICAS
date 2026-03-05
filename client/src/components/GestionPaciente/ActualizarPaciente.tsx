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

    /**
     * @description Maneja la actualización de un paciente existente. Realiza una solicitud para actualizar el paciente con los datos proporcionados y muestra un mensaje de éxito o error según corresponda.
     * @param data - Los datos del paciente a actualizar, obtenidos del formulario.
     */
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
     * @description Maneja la selección de un paciente de la lista de sugerencias. Actualiza el estado del paciente seleccionado y el número de documento en el campo de búsqueda.
     * @param e - El evento de selección del paciente, que contiene el valor del paciente seleccionado.
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