import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import NavButton from "../NavButton";
import { InputNumber } from "primereact/inputnumber";
import type { ICrearAdmin, ICrearProfesional } from "../../types";
import { createAdminRequest, createProfessionalRequest } from "../../services/user.service";
import { Calendar } from "primereact/calendar";

export default function CreatePersonnel() {
    const toast = useRef<Toast>(null);

    // Estados del formulario
    const [rol, setRol] = useState<string>("");
    const [nombres, setNombres] = useState<string>("");
    const [apellidos, setApellidos] = useState<string>("");
    const [tipoDocumento, setTipoDocumento] = useState<string>("");
    const [documento, setDocumento] = useState<string>("");
    const [fechaNacimiento, setFechaNacimiento] = useState<Date | null>(null);
    const [genero, setGenero] = useState<string>("");
    const [ciudadResidencia, setCiudadResidencia] = useState<string>("");
    const [celular, setCelular] = useState<number>(0);
    const [correo, setCorreo] = useState<string>("");
    const [eps, setEps] = useState<string>("");
    const [nombreContactoEmergencia, setNombreContactoEmergencia] = useState<string>("");
    const [celularContactoEmergencia, setCelularContactoEmergencia] = useState<number>(0);
    const [contrasena, setContrasena] = useState<string>("");

    // Estados adicionales si es administrativo
    const [cargo, setCargo] = useState<string>("");

    // Estados adicionales si es profesional
    const [licencia, setLicencia] = useState<string>("");
    const [especialidad, setEspecialidad] = useState<string>("");


    const roles = [
        { id: 1, name: "Administrativo" },
        { id: 2, name: "Profesional" }
    ];

    const tipoDoc = [
        { id: 1, name: "CC" },
        { id: 2, name: "CE" }
    ];

    const generos = [
        { id: 1, name: "femenino" },
        { id: 2, name: "masculino" },
        { id: 2, name: "otro" }
    ];

    const especialidades = [
        { id: 1, name: "psicología" },
        { id: 2, name: "psiquiatría" }
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

        if (rol === "Administrativo" && !cargo) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'El campo cargo es obligatorio',
                life: 3000
            });
            return;
        }

        if (rol === "Profesional" && (!licencia || !especialidad)) {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Licencia y especialidad son obligatorios',
                life: 3000
            });
            return;
        }

        const baseData = {
            nombres,
            apellidos,
            tipoDocumento,
            numeroDocumento: documento,
            fechaNacimiento: fechaNacimiento.toISOString().split("T")[0],
            genero,
            ciudadResidencia,
            celular,
            correo,
            eps,
            nombresContactoEmergencia: nombreContactoEmergencia,
            celularContactoEmergencia,
            contrasena,
        };

        try {
            if (rol === "Administrativo") {
                const adminData: ICrearAdmin = {
                    ...baseData,
                    cargo,
                };

                await createAdminRequest(adminData);
            }

            if (rol === "Profesional") {
                const profData: ICrearProfesional = {
                    ...baseData,
                    licencia,
                    especialidad,
                };

                await createProfessionalRequest(profData);
            }

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
        setRol("");
        setNombres("");
        setApellidos("");
        setTipoDocumento("");
        setDocumento("");
        setFechaNacimiento(null);
        setGenero("");
        setCiudadResidencia("");
        setCelular(0);
        setCorreo("");
        setEps("");
        setNombreContactoEmergencia("");
        setCelularContactoEmergencia(0);
        setContrasena("");
        setCargo("");
        setLicencia("");
        setEspecialidad("");
    };

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '90%' }} >
            <Toast ref={toast} />
            <form
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={createProfile}
            >
                <label className="font-bold text-cyan-700">Rol del empleado:</label>
                <Dropdown
                    value={rol} onChange={(e) => setRol(e.value)}
                    options={roles}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    required
                    aria-label="Selecciona el rol.."
                />

                {rol === "" ? 
                    <Card className="card col-span-2 flex text-center align-items-center justify-content-center justify-around bg-[#f1faee]">
                        <i className="pi pi-info-circle" style={{fontSize: '2rem', color: 'var(--primary-color)'}}></i>
                        <h3>Primero debes seleccionar el rol del empleado</h3>
                    </Card>
                    :
                    <>
                        <label htmlFor="patient" className="font-bold text-cyan-700">Nombres:</label>
                        <InputText
                            id="patient"
                            value={nombres} onChange={(e) => setNombres(e.target.value)}
                            placeholder="Nombre del paciente.."
                            required
                        />

                        <label htmlFor="patient" className="font-bold text-cyan-700">Apellidos:</label>
                        <InputText
                            id="patient"
                            value={apellidos} onChange={(e) => setApellidos(e.target.value)}
                            placeholder="Nombre del paciente.."
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
                            value={documento} onChange={(e) => setDocumento(e.target.value)} 
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
                            value={ciudadResidencia} onChange={(e) => setCiudadResidencia(e.target.value)}
                            required
                        />

                        <label className="font-bold text-cyan-700">Número de celular:</label>
                        <InputNumber 
                            placeholder="Ej: 3138264545" 
                            value={celular} onChange={(e) => setCelular(Number(e.value))}
                            type="tel" name="telefono"
                            useGrouping={false}
                            required
                        />

                        <label className="font-bold text-cyan-700">EPS:</label>
                        <InputText 
                            placeholder="Escribe aquí.." 
                            value={eps} onChange={(e) => setEps(e.target.value)}
                            required
                        />

                        <label className="font-bold text-cyan-700">Nombre del contacto de emergencia:</label>
                        <InputText 
                            placeholder="Escribe aquí.." 
                            value={nombreContactoEmergencia} onChange={(e) => setNombreContactoEmergencia(e.target.value)}
                            required
                        />

                        <label className="font-bold text-cyan-700">Número de celular del contacto de emergencia:</label>
                        <InputNumber 
                            placeholder="Escribe aquí.." 
                            value={celularContactoEmergencia} onChange={(e) => setCelularContactoEmergencia(Number(e.value))}
                            type="tel" name="telefono"
                            useGrouping={false}
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
                    </>
                }

                {rol === "Administrativo" && (
                    <>
                        <label className="font-bold text-cyan-700">Cargo:</label>
                        <InputText 
                            placeholder="Escribe aquí.." 
                            value={cargo} onChange={(e) => setCargo(e.target.value)} 
                            required
                        />
                    </>
                )}

                {rol === "Profesional" && (
                    <>
                        <label className="font-bold text-cyan-700">Número de licencia:</label> 
                        <InputText 
                            placeholder="Escribe aquí.." 
                            value={licencia} onChange={(e) => setLicencia(e.target.value)}
                            required
                        />

                        <label className="font-bold text-cyan-700">Especialidad:</label>
                        <Dropdown
                            value={especialidad} onChange={(e) => setEspecialidad(e.value)}
                            options={especialidades}
                            optionLabel="name"
                            optionValue="name"
                            placeholder="Selecciona aquí.."
                            className="w-full"
                            aria-label="Selecciona el lugar.."
                            required
                        />
                    </>
                )}

                <div className="col-span-2 flex justify-end">
                    <NavButton type="submit" label="Crear perfil" btnFunction={() => console.log('click')} />
                </div>
            </form>
        </Card>
    );
}
