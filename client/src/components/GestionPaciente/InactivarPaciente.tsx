import { useState } from "react";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { useAppToast } from "@/hooks/useAppToast";
import { AutoComplete } from "primereact/autocomplete";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import NavButton from "@/components/NavButton";
import { usePatientsData } from "@/hooks/usePatientsData";
import { usePatientSearch } from "@/hooks/usePatientSearch";
import { deactivateUserRequest } from "@/services/user.service";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export default function InactivarPaciente() {
    const { toast, showMessage } = useAppToast();
    const { patients, loadPatients } = usePatientsData(showMessage);
    const { filteredPatients, searchPatient } = usePatientSearch(patients);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);
    
    /**
     * @description Muestra un diálogo de confirmación antes de inactivar al paciente seleccionado. Si se confirma, se realiza la solicitud para inactivar al paciente y se muestra un mensaje de éxito o error según corresponda.
     */
    const confirmDeactivate = () => {
        if (!selectedPatient) {
            showMessage("warn", "Debe seleccionar un paciente.");
            return;
        }

        confirmDialog({
            message: `¿Segur@ que desea inactivar al paciente ${selectedPatient.nombres} ${selectedPatient.apellidos}?`,
            header: "Confirmar inactivación",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sí, inactivar",
            rejectLabel: "Cancelar",
            accept: async () => {
                try {
                    await deactivateUserRequest(selectedPatient.id);
                    showMessage("success", "Paciente inactivado correctamente.");
                    setSelectedPatient(null);
                    await loadPatients();
                } catch (error: any) {
                    const backendMessage =
                        error.response?.data?.message?.message ||
                        "Error inesperado al inactivar el paciente.";

                    showMessage("error", backendMessage);
                }
            }
        });
    };

    return (
        <Card style={{ background: '#f1faee', width: '100%' }}>
            <Toast ref={toast} />

            <AutoComplete
                value={selectedPatient}
                suggestions={filteredPatients}
                completeMethod={(e) => searchPatient(e)}
                field="numeroDocumento"
                onChange={(e) => setSelectedPatient(e.value)}
                placeholder="Ingrese documento del paciente"
                dropdown
                className="w-full"
            />

            <Divider />
            <ConfirmDialog />
            <form
                className="grid gap-2 items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={(e) => {
                    e.preventDefault();
                    confirmDeactivate();
                }}
            >
                { selectedPatient != null ?
                    <>
                        <label className="font-bold text-cyan-700">Paciente:</label>
                        <InputText
                            value={`${selectedPatient?.nombres} ${selectedPatient?.apellidos}` || ""}
                            placeholder="Sólo lectura.."
                            readOnly
                        />

                        <div className="col-span-2 flex justify-end">
                            <NavButton
                                type="submit"
                                label="Inactivar"
                                btnFunction={() => {}}
                            />
                        </div>
                    </>
                    : <div className="col-span-2 flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round">
                        <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                        <h3>Seleccione un paciente</h3>
                    </div>
                }
            </form>
        </Card>
    );
}