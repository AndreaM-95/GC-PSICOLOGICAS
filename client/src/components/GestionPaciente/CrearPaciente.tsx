import { useAppToast } from "@/hooks/useAppToast";
import { createPatientRequest } from "@/services/patient.service";
import PacienteForm from "./PacienteForm";

export default function CrearPaciente() {

    const { showMessage } = useAppToast();

    const handleCreate = async (data: any) => {
        try {
            await createPatientRequest(data);
            showMessage("success", "Usuario creado correctamente.");
        } catch (error: any) {
            const backendMessage =
                error.response?.data?.message?.message ||
                "Error inesperado";

            showMessage("error", backendMessage);
        }
    };

    return (
        <PacienteForm
            mode="create"
            onSubmit={handleCreate}
        />
    );
}