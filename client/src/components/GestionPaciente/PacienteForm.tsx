import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import NavButton from "@/components/NavButton";
import { UseInputValidation } from "@/utils/InputValidation";
import { constantes } from "@/utils/constantes";
import { SelectButton } from "primereact/selectbutton";

interface PacienteFormProps {
    mode: "create" | "edit";
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
}

export default function PacienteForm({
    mode,
    initialData,
    onSubmit
}: PacienteFormProps) {
    const { tiposDocumentos, generos } = constantes();

    const options = ['No', 'Si'];
    const [valueSwitch, setValueSwitch] = useState(options[0]);

    // ------------------ STATES ------------------
    const [idUsuario, setIdUsuario] = useState(0);
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
    const [genero, setGenero] = useState("");
    const [ciudadResidencia, setCiudadResidencia] = useState("");
    const [celular, setCelular] = useState("");
    const [correo, setCorreo] = useState("");
    const [eps, setEps] = useState("");
    const [nombreContactoEmergencia, setNombreContactoEmergencia] = useState("");
    const [celularContactoEmergencia, setCelularContactoEmergencia] = useState("");
    const [contrasena, setContrasena] = useState("");

    // ------------------ CARGAR DATOS EN EDIT ------------------
    /**
     * @description Carga los datos del paciente en el formulario cuando el modo es "edit" y se proporciona initialData. Convierte la fecha de nacimiento a un formato compatible con el componente Calendar.
     */
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setIdUsuario(initialData.id || 0)
            setNombres(initialData.nombres || "");
            setApellidos(initialData.apellidos || "");
            setTipoDocumento(initialData.tipoDocumento || "");
            setDocumento(initialData.numeroDocumento || "");

            if (initialData.fechaNacimiento) {
                const [year, month, day] = initialData.fechaNacimiento.split("-");
                const fechaLocal = new Date(
                    Number(year),
                    Number(month) - 1, // ⚠️ Mes empieza en 0
                    Number(day)
                );
                setFechaNacimiento(fechaLocal);
            } else {
                setFechaNacimiento(null);
            }

            setGenero(initialData.genero || "");
            setCiudadResidencia(initialData.ciudadResidencia || "");
            setCelular(initialData.celular || "");
            setCorreo(initialData.correo || "");
            setEps(initialData.eps || "");
            setNombreContactoEmergencia(initialData.nombresContactoEmergencia || "");
            setCelularContactoEmergencia(initialData.celularContactoEmergencia || "");
        }
    }, [mode, initialData]);

    /**
     * @description Limpia los campos del formulario, restableciendo su estado a los valores iniciales. Se utiliza después de crear o actualizar un paciente para limpiar el formulario y prepararlo para una nueva entrada.
     */
    const cleanForm = () => {
        setNombres("");
        setApellidos("");
        setTipoDocumento("");
        setDocumento("");
        setFechaNacimiento(null);
        setGenero("");
        setCiudadResidencia("");
        setCelular("");
        setCorreo("");
        setEps("");
        setNombreContactoEmergencia("");
        setCelularContactoEmergencia("");
        setContrasena("");
    };

    /**
     * @description Maneja el envío del formulario para crear o actualizar un paciente. Valida que los campos requeridos estén completos, construye el objeto de datos del paciente y llama a la función onSubmit proporcionada. Después de la operación, muestra un mensaje de éxito y limpia el formulario.
     * @param e - El evento de envío del formulario, que se utiliza para prevenir el comportamiento predeterminado y manejar la lógica personalizada de envío.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === "create") {
            if (
                !nombres || !apellidos || !tipoDocumento || !documento ||
                !fechaNacimiento || !genero || !ciudadResidencia ||
                !celular || !correo || !eps ||
                !nombreContactoEmergencia || !celularContactoEmergencia ||
                !contrasena
            ) {
                return;
            }
        }

        const patientData = {
            ...(idUsuario && {idUsuario}),
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento: documento,
            fechaNacimiento: fechaNacimiento?.toISOString().split("T")[0],
            genero,
            ciudadResidencia,
            celular: celular,
            correo,
            eps,
            nombresContactoEmergencia: nombreContactoEmergencia,
            celularContactoEmergencia: celularContactoEmergencia,
            ...(contrasena && { contrasena }) // Solo enviar si existe
        };

        await onSubmit(patientData);
        cleanForm();
    };

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '90%' }} >
            <form
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={handleSubmit}
            >
                <label className="font-bold text-cyan-700">Nombres:</label>
                <InputText
                    value={nombres}
                    onChange={UseInputValidation(setNombres, "letters")}
                    placeholder="Nombres del paciente.."
                    required={mode === "create"}
                />

                <label className="font-bold text-cyan-700">Apellidos:</label>
                <InputText
                    value={apellidos}
                    onChange={UseInputValidation(setApellidos, "letters")}
                    placeholder="Apellidos del paciente.."
                    required={mode === "create"}
                />

                <label className="font-bold text-cyan-700">Tipo de documento:</label>
                <Dropdown
                    value={tipoDocumento}
                    onChange={(e) => setTipoDocumento(e.value)}
                    options={tiposDocumentos}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    required={mode === "create"}
                />

                <label className="font-bold text-cyan-700">Número de documento:</label>
                <InputText
                    value={documento}
                    onChange={UseInputValidation(setDocumento, "numbers")}
                    placeholder="Escribe aquí.."
                    required={mode === "create"}
                />

                <label className="font-bold text-cyan-700">Fecha de nacimiento:</label>
                <Calendar
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.value ?? null)}
                    maxDate={new Date()}
                    dateFormat="dd/mm/yy"
                    showIcon
                    placeholder="Selecciona aquí.."
                    aria-label="Selecciona la fecha de nacimiento.."
                    className="w-full"
                    locale="es"
                    required={mode === "create"}
                />

                <label className="font-bold text-cyan-700">Género:</label>
                <Dropdown
                    value={genero}
                    onChange={(e) => setGenero(e.value)}
                    options={generos}
                    optionLabel="name"
                    optionValue="name"
                    className="w-full"
                    placeholder="Selecciona aquí.."
                    aria-label="Selecciona el género.."
                    required={mode === "create"}
                />

                <label className="font-bold text-cyan-700">Ciudad de residencia:</label>
                <InputText
                    value={ciudadResidencia}
                    onChange={UseInputValidation(setCiudadResidencia, "letters")}
                    required={mode === "create"}
                    placeholder="Escribe aquí.." 
                />

                <label className="font-bold text-cyan-700">Número de celular:</label>
                <InputText
                    value={celular}
                    onChange={UseInputValidation(setCelular, "phone")}
                    maxLength={10}
                    required={mode === "create"}
                    placeholder="Ej: 3138521212"
                />

                <label className="font-bold text-cyan-700">EPS:</label>
                <InputText
                    value={eps}
                    onChange={UseInputValidation(setEps, "letters")}
                    required={mode === "create"}
                    placeholder="Escribe aquí.." 
                />

                <label className="font-bold text-cyan-700">Contacto de emergencia:</label>
                <InputText
                    value={nombreContactoEmergencia}
                    onChange={UseInputValidation(setNombreContactoEmergencia, "letters")}
                    required={mode === "create"}
                    placeholder="Escribe aquí su nombre.." 
                />

                <label className="font-bold text-cyan-700">Celular contacto emergencia:</label>
                <InputText
                    value={celularContactoEmergencia}
                    onChange={UseInputValidation(setCelularContactoEmergencia, "phone")}
                    maxLength={10}
                    required={mode === "create"}
                    placeholder="Ej: 3138521212"
                />

                <label className="font-bold text-cyan-700">Correo:</label>
                <InputText
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    type="email"
                    required={mode === "create"}
                    placeholder="Ej. test@gmail.com" 
                />

                {mode === "create" && (
                    <>
                        <label className="font-bold text-cyan-700">Contraseña:</label>
                        <InputText
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            type="password"
                            required
                            placeholder="Escribe aquí.." 

                        />
                    </>
                )}

                {mode === "edit" && (
                    <>
                        <>
                            <p className="font-bold text-cyan-700">
                                ¿Deseas cambiar la contraseña?
                            </p>

                            <SelectButton
                                value={valueSwitch}
                                onChange={(e) => setValueSwitch(e.value)}
                                options={options}
                            />
                        </>

                        {valueSwitch === "Si" && (
                            <>
                                <label className="font-bold text-cyan-700">
                                    Nueva contraseña:
                                </label>
                                <InputText
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    type="password"
                                    placeholder="Escribe aquí.."
                                />
                            </>
                        )}
                    </>
                )}

                <div className="col-span-2 flex justify-end">
                    <NavButton
                        type="submit"
                        label={mode === "create" ? "Crear perfil" : "Actualizar perfil"}
                        btnFunction={() => {}}
                    />
                </div>
            </form>
        </Card>
    );
}