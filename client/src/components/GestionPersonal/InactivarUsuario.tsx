import { useState } from "react";
import { Toast } from 'primereact/toast';
import { useAppToast } from "@/hooks/useAppToast";
import { useProfessionalData } from "@/hooks/useProfessionalData";
import { deactivateUserRequest } from "@/services/user.service";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { useConfirmDeactivate } from "@/hooks/useConfirmDeactivate";
import { DesactivateCard } from "../DesactivateCard";
import { useProfessionalSearch } from "@/hooks/useProfessionalSearch";
import { useAdminsSearch } from "@/hooks/useAdminsSearch";
import { useAdminsData } from "@/hooks/useAdminsData";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export default function InactivarUsuario() {
    const { toast, showMessage } = useAppToast();
    //ADMIN
    const { admins, loadAdmins } = useAdminsData(showMessage);
    const { filteredAdmins, searchAdmins } = useAdminsSearch(admins);
    //PROFESIONAL
    const { professionals, loadProfessionals } = useProfessionalData(showMessage);
    const { filteredProfessionals, searchProfessionals } = useProfessionalSearch(professionals);
    //GENERAL
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const { confirmDeactivate } = useConfirmDeactivate();
    const [rol, setRol] = useState<string>("");
    const roles = [
        { id: 1, name: "Administrativo" },
        { id: 2, name: "Profesional" }
    ];

    /**
     * @description Configuración dinámica basada en el rol seleccionado. Dependiendo del rol, se asignan el nombre de la entidad, los datos, las sugerencias, la función de búsqueda y la función de carga correspondientes para el componente de selección de usuario. Esto permite reutilizar la lógica de selección y desactivación sin duplicar código para cada tipo de usuario.
     */
    const roleConfig = {
        Administrativo: {
            entityName: "administrativo",
            data: admins,
            suggestions: filteredAdmins,
            search: searchAdmins,
            load: loadAdmins,
        },
        Profesional: {
            entityName: "profesional",
            data: professionals,
            suggestions: filteredProfessionals,
            search: searchProfessionals,
            load: loadProfessionals,
        }
    };
    
    /**
     * @description Configuración dinámica basada en el rol seleccionado. Dependiendo del rol, se asignan las sugerencias y la función de búsqueda correspondientes para el componente de selección de usuario. Esto permite reutilizar la lógica de selección sin duplicar código para cada tipo de usuario.
     */
    const currentConfig = roleConfig[rol as keyof typeof roleConfig];
    
    /**
     * @description Muestra un diálogo de confirmación antes de inactivar al usuario seleccionado. Si se confirma, se realiza la solicitud para inactivar al usuario y se muestra un mensaje de éxito o error según corresponda.
     */
    const handleDeactivate = () => {
        if (!selectedUser) {
            showMessage("warn", "Debe seleccionar un paciente.");
            return;
        }
        confirmDeactivate({
            entityName: currentConfig.entityName,
            fullName: `${selectedUser.nombres} ${selectedUser.apellidos}`,
            onAccept: async () => {
                try {
                    await deactivateUserRequest(selectedUser.idPersona);
                    showMessage("success", "Usuario inactivado correctamente.");
                    setSelectedUser(null);
                    await currentConfig.load();
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
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '90%' }}>
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className="w-[80%] m-auto">
                <label className="font-bold text-cyan-700">Selecciona el rol de la persona a desactivar:</label>
                <Dropdown
                    value={rol} 
                    onChange={(e) => {
                        setRol(e.value);
                        setSelectedUser(null);
                    }}
                    options={roles}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full mt-2"
                    required
                    aria-label="Selecciona el rol.."
                />
            </div>

            <Divider/>

            {rol && currentConfig && (
                <DesactivateCard
                    entityName={currentConfig.entityName}
                    selectedItem={selectedUser}
                    setSelectedItem={setSelectedUser}
                    suggestions={currentConfig.suggestions}
                    search={currentConfig.search}
                    getFullName={(p) => `${p.nombres} ${p.apellidos}`}
                    getIdentifier={(p) => p.numeroDocumento}
                    placeholder={`Ingrese documento del ${currentConfig.entityName}`}
                    onSubmit={handleDeactivate}
                />
            )}
        </Card>
    );
}