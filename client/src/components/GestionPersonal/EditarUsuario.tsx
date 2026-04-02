import { useState } from "react";
import { useAdminsData } from "@/hooks/useAdminsData";
import { useAdminsSearch } from "@/hooks/useAdminsSearch";
import { useProfessionalData } from "@/hooks/useProfessionalData";
import { useProfessionalSearch } from "@/hooks/useProfessionalSearch";
import { updateAdminRequest, updateProfessionalRequest } from "@/services/user.service";
import { useAppToast } from "@/hooks/useAppToast";
import { DesactivateCard } from "../DesactivateCard";
import PersonalForm from "./PersonalForm";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Divider } from "primereact/divider";
import type { IActualizarUsuario } from "@/types";

export default function EditarUsuario() {
    const { toast, showMessage } = useAppToast();

    const [rol, setRol] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});

    // hooks
    const { admins } = useAdminsData(showMessage);
    const { filteredAdmins, searchAdmins } = useAdminsSearch(admins);

    const { professionals } = useProfessionalData(showMessage);
    const { filteredProfessionals, searchProfessionals } = useProfessionalSearch(professionals);
    const [changePassword, setChangePassword] = useState(false);

    const roles = [
        { id: 1, name: "Administrativo" },
        { id: 2, name: "Profesional" }
    ];

    const roleConfig = {
        Administrativo: {
            suggestions: filteredAdmins,
            search: searchAdmins
        },
        
        Profesional: {
            suggestions: filteredProfessionals,
            search: searchProfessionals
        }
    };

    const currentConfig = roleConfig[rol as keyof typeof roleConfig];

    // llenar formulario
    const handleSelectUser = (user: IActualizarUsuario | null) => {
        setSelectedUser(user);
        if (user) {
            setFormData({
                nombres: user.nombres || "",
                apellidos: user.apellidos || "",
                tipoDocumento: user.tipoDocumento || "",
                numeroDocumento: user.numeroDocumento || "",
                fechaNacimiento: user.fechaNacimiento
                    ? new Date(user.fechaNacimiento)
                    : null,
                genero: user.genero || "",
                ciudadResidencia: user.ciudadResidencia || "",
                celular: user.celular || "",
                eps: user.eps || "",
                nombresContactoEmergencia: user.nombresContactoEmergencia || "",                
                celularContactoEmergencia: user.celularContactoEmergencia || "",
                correo: user.correo || "",
                contrasena: "", // nunca precargar contraseña
                cargo: user.cargo || "",
                licencia: user.licencia || "",
                especialidad: user.especialidad || ""
            });
        }
    };

    // actualizar
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
                fechaNacimiento: formData.fechaNacimiento
                    ? formData.fechaNacimiento.toISOString().split("T")[0]
                    : null
            };

            // eliminar contraseña si no se cambia
            if (!changePassword) {
                delete dataToSend.contrasena;
            }

            if (rol === "Administrativo") {
                await updateAdminRequest(selectedUser.id, dataToSend);
            } else {
                await updateProfessionalRequest(selectedUser.id, dataToSend);
            }

            showMessage("success", "Usuario actualizado");
            setSelectedUser(null);
            setFormData({});
        } catch {
            showMessage("error", "Error al actualizar");
        }
    };

    return (
        <Card style={{ background: '#f1faee', width: '90%', margin: 'auto' }}>
            <Toast ref={toast} />

            <div className="w-[80%] m-auto mb-4">
                <label className="font-bold text-cyan-700"> Selecciona el rol del empleado: </label>
                <Dropdown
                    value={rol}
                    onChange={(e) => {
                        setRol(e.value);
                        setSelectedUser(null);
                        setFormData({});
                        setChangePassword(false);
                    }}
                    options={roles}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full mt-2"
                />
            </div>

            <Divider/>

            {rol && !selectedUser && (
                <DesactivateCard
                    entityName={rol.toLowerCase()}
                    selectedItem={selectedUser}
                    setSelectedItem={handleSelectUser}
                    suggestions={currentConfig.suggestions}
                    search={currentConfig.search}
                    getFullName={(p) => `${p.nombres} ${p.apellidos}`}
                    getIdentifier={(p) => p.numeroDocumento || ""}
                    placeholder={`Buscar ${rol}`}
                    onSubmit={() => {}}
                />
            )}

            {selectedUser && (
               <PersonalForm 
                    mode="edit"
                    formData={formData} 
                    setFormData={setFormData} 
                    rol={rol} 
                    onSubmit={handleUpdate} 
                    buttonLabel="Actualizar perfil" 
                />
            )}
        </Card>
    );
}