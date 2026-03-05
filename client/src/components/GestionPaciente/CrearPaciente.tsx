import { useAppToast } from "@/hooks/useAppToast";
import { createPatientRequest } from "@/services/patient.service";
import PacienteForm from "./PacienteForm";

export default function CrearPaciente() {
    const { showMessage } = useAppToast();

    /**
     * @description Maneja la creación de un nuevo paciente. Realiza una solicitud para crear el paciente con los datos proporcionados y muestra un mensaje de éxito o error según corresponda.
     * @param data - Los datos del paciente a crear, obtenidos del formulario.
     */
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