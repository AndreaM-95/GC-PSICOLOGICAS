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

    /**
     * @description Configuración dinámica basada en el rol seleccionado. Dependiendo del rol, se asignan las sugerencias y la función de búsqueda correspondientes para el componente de selección de usuario. Esto permite reutilizar la lógica de selección sin duplicar código para cada tipo de usuario.
     */
    const currentConfig = roleConfig[rol as keyof typeof roleConfig];

    /**
     * @description Función que maneja la selección de un usuario para editar. Al seleccionar un usuario, se actualiza el estado `selectedUser` y se precargan los datos del usuario en el formulario. Si se deselecciona (selecciona null), se limpia el formulario. La contraseña no se precarga por razones de seguridad, y se inicializa el estado para cambiar la contraseña solo si el usuario decide hacerlo.
     * @param user El usuario seleccionado para editar. Puede ser un objeto con los datos del usuario o null si se deselecciona. Al seleccionar un usuario, se extraen sus datos y se formatean adecuadamente para precargar el formulario de edición.
     */
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

    /**
     * @description Función que maneja la actualización de un usuario existente. Al enviar el formulario de edición, se construye el objeto de datos a enviar al backend, formateando la fecha de nacimiento y eliminando la contraseña si no se ha cambiado. Dependiendo del rol, se envía la solicitud de actualización correspondiente. Si la actualización es exitosa, se muestra un mensaje de éxito, se limpia el formulario y se deselecciona el usuario. En caso de error, se muestra un mensaje de error al usuario.
     * @param e El evento de envío del formulario. Se previene el comportamiento por defecto para manejar la lógica personalizada de actualización de usuario.
     */
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
            
            {/**
             * @description Renderizado condicional del componente de selección de usuario. Si se ha seleccionado un rol pero no se ha seleccionado un usuario, se muestra el componente `DesactivateCard` que permite buscar y seleccionar un usuario para editar. El componente recibe las sugerencias y la función de búsqueda correspondientes al rol seleccionado, así como funciones para obtener el nombre completo e identificador del usuario para mostrar en la interfaz.
             */}
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

            {/**
             * @description Renderizado condicional del formulario de edición. Si se ha seleccionado un usuario, se muestra el componente `PersonalForm` precargado con los datos del usuario para editar. El formulario recibe el modo "edit", los datos del formulario, la función para actualizar los datos, el rol seleccionado, la función de envío para actualizar el usuario y la etiqueta del botón.
             */}
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