import { useAppToast } from "@/hooks/useAppToast";
import { createPatientRequest } from "@/services/patient.service";
import PacienteForm from "./PacienteForm";
import type { ICrearPaciente } from "@/types";
import { Toast } from "primereact/toast";

export default function CrearPaciente() {
    const { toast, showMessage } = useAppToast();

    /**
     * @description Maneja la creación de un nuevo paciente. Realiza una solicitud para crear el paciente con los datos proporcionados y muestra un mensaje de éxito o error según corresponda.
     * @param data - Los datos del paciente a crear, obtenidos del formulario.
     */
    const handleCreate = async (data: ICrearPaciente) => {
        try {
            await createPatientRequest(data);
            showMessage("success", "Paciente creado correctamente.");
        } catch (error: any) {
            const backendMessage =error.response?.data?.message?.message ||
                "Error inesperado al crear la cita.";
                
            showMessage("error", backendMessage);
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <PacienteForm
                mode="create"
                onSubmit={handleCreate}
            />
        </>
    );
}