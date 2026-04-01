import { useState } from "react";
import { createAdminRequest, createProfessionalRequest } from "@/services/user.service";
import { useAppToast } from "@/hooks/useAppToast";
import PersonalForm from "./PersonalForm";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import type { ICrearAdmin, ICrearProfesional } from "@/types";

export default function CrearUsuario() {
    const { toast, showMessage } = useAppToast();
    const [rol, setRol] = useState<string>("");
    const [formData, setFormData] = useState<any>({
        nombres: "",
        apellidos: "",
        tipoDocumento: "",
        numeroDocumento: "",
        fechaNacimiento: null,
        genero: "",
        ciudadResidencia: "",
        celular: "",
        eps: "",
        nombresContactoEmergencia: "",
        celularContactoEmergencia: "",
        correo: "",
        contrasena: "",
        cargo: "",
        licencia: "",
        especialidad: ""
    });

    const roles = [
        { id: 1, name: "Administrativo" },
        { id: 2, name: "Profesional" }
    ];

    // Crear usuario
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const dataToSend = {
                ...formData,
                fechaNacimiento: formData.fechaNacimiento
                    ? formData.fechaNacimiento.toISOString().split("T")[0]
                    : null
            };
            if (rol === "Administrativo") {
                const adminData: ICrearAdmin = {
                    ...dataToSend,
                    cargo: formData.cargo,
                };

                await createAdminRequest(adminData);
            }

            if (rol === "Profesional") {
                const profData: ICrearProfesional = {
                    ...dataToSend,
                    licencia: formData.licencia,
                    especialidad: formData.especialidad
                };

                await createProfessionalRequest(profData);
            }

            showMessage("success", "Usuario creado correctamente");

            // limpiar
            setFormData({
                nombres: "",
                apellidos: "",
                tipoDocumento: "",
                numeroDocumento: "",
                fechaNacimiento: null,
                genero: "",
                ciudadResidencia: "",
                celular: "",
                eps: "",
                nombresContactoEmergencia: "",
                celularContactoEmergencia: "",
                correo: "",
                contrasena: "",
                cargo: "",
                licencia: "",
                especialidad: ""
            });
        } catch (error: any) {
            console.error("El error es:" + error);
            const backendMessage =
                error.response?.data?.message?.message ||
                "Error al crear el usuario";

            showMessage("error", backendMessage);
        }
        console.log(formData);
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
                    // limpiar formulario al cambiar rol
                    setFormData({
                        nombres: "",
                        apellidos: "",
                        tipoDocumento: "",
                        numeroDocumento: "",
                        fechaNacimiento: null,
                        genero: "",
                        ciudadResidencia: "",
                        celular: "",
                        eps: "",
                        nombresContactoEmergencia: "",
                        celularContactoEmergencia: "",
                        correo: "",
                        contrasena: "",
                        cargo: "",
                        licencia: "",
                        especialidad: ""
                    });
                }}
                options={roles}
                optionLabel="name"
                optionValue="name"
                placeholder="Selecciona aquí.."
                className="w-full mt-2"
            />
        </div>

        {/* Mensaje si no hay rol */}
        {!rol && (
            <div className="text-center p-4">
                <i className="pi pi-info-circle mr-2"></i>
                <span>Primero debes seleccionar un rol</span>
            </div>
        )}

        {/* Formulario reutilizable */}
        {rol && (
            <PersonalForm
                formData={formData}
                setFormData={setFormData}
                rol={rol}
                onSubmit={handleCreate}
                buttonLabel="Crear perfil"
            />
        )}
        </Card>
    );
}