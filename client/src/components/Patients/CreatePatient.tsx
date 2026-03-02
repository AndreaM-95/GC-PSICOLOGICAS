import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import NavButton from "../NavButton";
import { createPatientRequest } from "@/services/patient.service";
import { Calendar } from "primereact/calendar";
import { UseInputValidation } from "@/utils/InputValidation";

export default function CreatePatient() {
    const toast = useRef<Toast>(null);

    // Estados del formulario
    const [nombres, setNombres] = useState<string>("");
    const [apellidos, setApellidos] = useState<string>("");
    const [tipoDocumento, setTipoDocumento] = useState<string>("");
    const [documento, setDocumento] = useState<string>("");
    const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
    const [genero, setGenero] = useState<string>("");
    const [ciudadResidencia, setCiudadResidencia] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [eps, setEps] = useState<string>("");
    const [nombreContactoEmergencia, setNombreContactoEmergencia] = useState<string>("");
    const [celularContactoEmergencia, setCelularContactoEmergencia] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");

    const tipoDoc = [
        { id: 1, name: "CC" },
        { id: 2, name: "TI" },
        { id: 2, name: "CE" }
    ];

    const generos = [
        { id: 1, name: "femenino" },
        { id: 2, name: "masculino" },
        { id: 2, name: "otro" }
    ];

    // --- Enviar perfil al backend ---
    const createProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación previa
        if (!nombres || !apellidos || !tipoDocumento || !documento || !fechaNacimiento ||
            !genero || !ciudadResidencia || !celular || !correo || !eps ||
            !nombreContactoEmergencia || !celularContactoEmergencia || !contrasena) {

            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Todos los campos requeridos deben estar completos',
                life: 3000
            });
            return;
        }

        const patientData = {
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento: documento,
            fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
            genero,
            ciudadResidencia,
            celular: Number(celular),
            correo,
            eps,
            nombresContactoEmergencia: nombreContactoEmergencia,
            celularContactoEmergencia: Number(celularContactoEmergencia),
            contrasena,
        };

        try {
            await createPatientRequest(patientData);
            cleanForm();
            toast.current?.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Usuario creado correctamente.',
                life: 3000,
            });

        } catch (error: any) {
            console.error("Error:", error.response?.data);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || "Error al crear el usuario",
                life: 3000
            });
        }
    };

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

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '90%' }} >
            <Toast ref={toast} />
            <form
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={createProfile}
            >
                <label htmlFor="patient" className="font-bold text-cyan-700">Nombres:</label>
                <InputText
                    id="patient"
                    value={nombres}
                    onChange={UseInputValidation(setNombres, "letters")}
                    placeholder="Nombres del paciente.."
                    required
                />

                <label htmlFor="patient" className="font-bold text-cyan-700">Apellidos:</label>
                <InputText
                    id="patient"
                    value={apellidos} 
                    onChange={UseInputValidation(setApellidos, "letters")}
                    placeholder="Apellidos del paciente.."
                    required
                />

                <label className="font-bold text-cyan-700">Tipo de documento:</label>
                <Dropdown
                    value={tipoDocumento} onChange={(e) => setTipoDocumento(e.value)}
                    options={tipoDoc}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    aria-label="Selecciona el tipo de documento.."
                    required
                />

                <label className="font-bold text-cyan-700">Número de documento:</label>
                <InputText 
                    placeholder="Escribe aquí.." 
                    value={documento} 
                    onChange={UseInputValidation(setDocumento, "numbers")}
                    required
                />
                
                <label className="font-bold text-cyan-700">Fecha de nacimiento:</label>
                <Calendar
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.value ?? null)}
                    maxDate={new Date()}    // No permitir días superiores a hoy
                    dateFormat="dd/mm/yy"
                    showIcon
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    required
                />

                <label className="font-bold text-cyan-700">Género:</label>
                <Dropdown
                    value={genero} onChange={(e) => setGenero(e.value)}
                    options={generos}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    aria-label="Selecciona el género.."
                    required
                />

                <label className="font-bold text-cyan-700">Ciudad de residencia:</label>
                <InputText 
                    placeholder="Escribe aquí.." 
                    value={ciudadResidencia}
                    onChange={UseInputValidation(setCiudadResidencia, "letters")}
                    required
                />

                <label className="font-bold text-cyan-700">Número de celular:</label>
                <InputText
                    placeholder="Ej: 3138521212"
                    type="tel"
                    value={celular}
                    onChange={UseInputValidation(setCelular, "phone")}
                    maxLength={10}
                    inputMode="numeric"
                    required
                />

                <label className="font-bold text-cyan-700">EPS:</label>
                <InputText 
                    placeholder="Escribe aquí.." 
                    value={eps} 
                    onChange={UseInputValidation(setEps, "letters")}
                    required
                />

                <label className="font-bold text-cyan-700">Nombre del contacto de emergencia:</label>
                <InputText 
                    placeholder="Escribe aquí.." 
                    value={nombreContactoEmergencia} 
                    onChange={UseInputValidation(setNombreContactoEmergencia, "letters")}
                    required
                />

                <label className="font-bold text-cyan-700">Número de celular del contacto de emergencia:</label>
                <InputText
                    placeholder="Ej: 3138521212"
                    type="tel"
                    value={celularContactoEmergencia}
                    onChange={UseInputValidation(setCelularContactoEmergencia, "phone")}
                    maxLength={10}
                    inputMode="numeric"
                    required
                />
                
                <label className="font-bold text-cyan-700">Correo electrónico:</label>
                <InputText 
                    placeholder="Ej. test@gmail.com" 
                    value={correo} onChange={(e) => setCorreo(e.target.value)}
                    type="email"
                    required
                />

                <label className="font-bold text-cyan-700">Contraseña:</label>
                <InputText 
                    placeholder="Escribe aquí.." 
                    value={contrasena} onChange={(e) => setContrasena(e.target.value)} 
                    type="password"
                    required
                />

                <div className="col-span-2 flex justify-end">
                    <NavButton type="submit" label="Crear perfil" btnFunction={() => console.log('click')} />
                </div>
            </form>
        </Card>
    );
}
