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

export default function InactivarPaciente() {
    const { toast, showMessage } = useAppToast();
    const { patients, loadPatients } = usePatientsData(showMessage);
    const { filteredPatients, searchPatient } = usePatientSearch(patients);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    const deactivateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPatient) {
            showMessage("warn", "Debe seleccionar un paciente.");
            return;
        }

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
    };

    return (
        <Card style={{ background: '#f1faee', width: '100%' }}>
            <Toast ref={toast} />

            <AutoComplete
                value={selectedPatient}
                suggestions={filteredPatients}
                completeMethod={(e) => searchPatient(e)}
                field="document"
                onChange={(e) => setSelectedPatient(e.value)}
                placeholder="Ingrese documento del paciente"
                dropdown
                className="w-full"
            />

            <Divider />

            <form
                className="grid gap-2 items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={deactivateUser}
            >

                <label className="font-bold text-cyan-700">Paciente:</label>
                <InputText
                    value={selectedPatient?.name || ""}
                    readOnly
                />

                <div className="col-span-2 flex justify-end">
                    <NavButton
                        type="submit"
                        label="Inactivar"
                        btnFunction={() => {}}
                    />
                </div>

            </form>
        </Card>
    );
}