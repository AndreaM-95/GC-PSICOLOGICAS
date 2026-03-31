import { useState } from "react";
import { Toast } from 'primereact/toast';
import { useAppToast } from "@/hooks/useAppToast";
import { usePatientsData } from "@/hooks/usePatientsData";
import { usePatientSearch } from "@/hooks/usePatientSearch";
import { deactivateUserRequest } from "@/services/user.service";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useConfirmDeactivate } from "@/hooks/useConfirmDeactivate";
import { DesactivateCard } from "../DesactivateCard";

export default function InactivarPaciente() {
    const { toast, showMessage } = useAppToast();
    const { patients, loadPatients } = usePatientsData(showMessage);
    const { filteredPatients, searchPatient } = usePatientSearch(patients);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    const { confirmDeactivate } = useConfirmDeactivate();
    
    /**
     * @description Muestra un diálogo de confirmación antes de inactivar al paciente seleccionado. Si se confirma, se realiza la solicitud para inactivar al paciente y se muestra un mensaje de éxito o error según corresponda.
     */
    const handleDeactivate = () => {
        if (!selectedPatient) {
            showMessage("warn", "Debe seleccionar un paciente.");
            return;
        }

        confirmDeactivate({
            entityName: "paciente",
            fullName: `${selectedPatient.nombres} ${selectedPatient.apellidos}`,
            onAccept: async () => {
                try {
                    await deactivateUserRequest(selectedPatient.id);
                    showMessage("success", "Paciente inactivado correctamente.");
                    setSelectedPatient(null);
                    await loadPatients();
                } catch (error: any) {
                    const backendMessage =
                        error.response?.data?.message?.message ||
                        "Error inesperado.";

                showMessage("error", backendMessage);
                }
            }
        });
    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />

            <DesactivateCard
                entityName="paciente"
                selectedItem={selectedPatient}
                setSelectedItem={setSelectedPatient}
                suggestions={filteredPatients}
                search={searchPatient}
                getFullName={(p) => `${p.nombres} ${p.apellidos}`}
                getIdentifier={(p) => p.numeroDocumento}
                placeholder="Ingrese documento del paciente"
                onSubmit={handleDeactivate}
            />
        </>
    );
}