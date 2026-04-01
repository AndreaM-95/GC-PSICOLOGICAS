import { InputText } from "primereact/inputtext";
import NavButton from "@/components/NavButton";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { UseInputValidation } from "@/utils/InputValidation";
import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";

interface Props {
  formData: any;
  setFormData: (data: any) => void;
  rol: string;
  onSubmit: (e: React.FormEvent) => void;
  buttonLabel: string;
  mode: "create" | "edit";
}

export default function PersonalForm({
  formData,
  setFormData,
  rol,
  onSubmit,
  buttonLabel,
  mode
}: Props) {
    const options = ['No', 'Si'];
    const [valueSwitch, setValueSwitch] = useState(options[0]);

    const tipoDoc = [
        { id: 1, name: "CC" },
        { id: 2, name: "CE" }
    ];

    const generos = [
        { id: 1, name: "femenino" },
        { id: 2, name: "masculino" },
        { id: 2, name: "otro" }
    ];

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <form
            className="grid gap-2"
            style={{ gridTemplateColumns: "35% 65%" }}
            onSubmit={onSubmit}
        >
            <label className="font-bold text-cyan-700">Nombres:</label>
            <InputText
                value={formData.nombres}
                onChange={(e) => handleChange("nombres", e.target.value)}
                placeholder="Nombre del usuario.."
                required
            />

            <label className="font-bold text-cyan-700">Apellidos:</label>
            <InputText
                value={formData.apellidos}
                onChange={(e) => handleChange("apellidos", e.target.value)}
                placeholder="Apellido del usuario.."
                required
            />

            <label className="font-bold text-cyan-700">Tipo de documento:</label>
            <Dropdown
                value={formData.tipoDocumento} 
                onChange={(e) => handleChange("tipoDocumento", e.value)}
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
                type="number"
                value={formData.numeroDocumento}
                onChange={UseInputValidation(
                    (value) => handleChange("numeroDocumento", value),
                    "numbers"
                )}
                inputMode="numeric"
                required
            />

            <label className="font-bold text-cyan-700">Fecha de nacimiento:</label>
            <Calendar
                value={formData.fechaNacimiento}
                onChange={(e) => handleChange("fechaNacimiento", e.value ?? null)}
                maxDate={new Date()}    // No permitir días superiores a hoy
                dateFormat="dd/mm/yy"
                showIcon
                placeholder="Selecciona aquí.."
                className="w-full"
                locale="es"
                required
            />

            <label className="font-bold text-cyan-700">Género:</label>
            <Dropdown
                value={formData.genero} 
                onChange={(e) => handleChange("genero", e.value)}
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
                value={formData.ciudadResidencia}
                onChange={UseInputValidation(
                    (value) => handleChange("ciudadResidencia", value),
                    "letters"
                )}
                placeholder="Ciudad de residencia.."
                required
            />

            <label className="font-bold text-cyan-700">Número de celular:</label>
            <InputText
                placeholder="Ej: 3138521212"
                type="tel"
                value={formData.celular}
                onChange={UseInputValidation(
                    (value) => handleChange("celular", value),
                    "phone"
                )}
                maxLength={10}
                inputMode="numeric"
                required
            />

            <label className="font-bold text-cyan-700">EPS:</label>
            <InputText 
                placeholder="Escribe aquí.." 
                value={formData.eps} 
                onChange={UseInputValidation(
                    (value) => handleChange("eps", value),
                    "letters"
                )}
                required
            />

            <label className="font-bold text-cyan-700">Nombre del contacto de emergencia:</label>
            <InputText 
                placeholder="Escribe aquí.." 
                value={formData.nombresContactoEmergencia} 
                onChange={UseInputValidation(
                    (value) => handleChange("nombresContactoEmergencia", value),
                    "letters"
                )}
                required
            />

            <label className="font-bold text-cyan-700">Número de celular del contacto de emergencia:</label>
            <InputText
                placeholder="Ej: 3138521212"
                type="tel"
                value={formData.celularContactoEmergencia}
                onChange={UseInputValidation(
                    (value) => handleChange("celularContactoEmergencia", value),
                    "phone"
                )}
                maxLength={10}
                inputMode="numeric"
                required
            />

            <label className="font-bold text-cyan-700">Correo electrónico:</label>
            <InputText
                value={formData.correo}
                onChange={(e) => handleChange("correo", e.target.value)}
                type="email"
                placeholder="Ej. test@psicogest.com.co" 
                required
            />

            {/* CAMPO DE LA CONTRASEÑA */}
            {mode === "create" && (
                <>
                    <label className="font-bold text-cyan-700">Contraseña:</label>
                    <InputText 
                        placeholder="Escribe aquí.." 
                        value={formData.contrasena} onChange={(e) => handleChange("contrasena", e.target.value)} 
                        type="password"
                        required
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
                                placeholder="Escribe aquí.." 
                                value={formData.contrasena} onChange={(e) => handleChange("contrasena", e.target.value)} 
                                type="password"
                                required
                            />
                        </>
                    )}
                </>
            )}

            {/* CAMPOS POR ROL */}
            {rol === "Administrativo" && (
                <>
                    <label className="font-bold text-cyan-700">Cargo:</label>
                    <InputText
                        value={formData.cargo}
                        onChange={(e) => handleChange("cargo", e.target.value)}
                        placeholder="Escribe aquí.." 
                        required
                    />
                </>
            )}

            {rol === "Profesional" && (
                <>
                    <label className="font-bold text-cyan-700">Licencia:</label>
                    <InputText
                        value={formData.licencia}
                        onChange={(e) => handleChange("licencia", e.target.value)}
                        placeholder="Escribe aquí.." 
                        required
                    />

                    <label className="font-bold text-cyan-700">Especialidad:</label>
                    <InputText
                        value={formData.especialidad}
                        onChange={(e) => handleChange("especialidad", e.target.value)}
                        placeholder="Escribe aquí.." 
                        required
                    />
                </>
            )}

            <div className="col-span-2 flex justify-end">
                <NavButton type="submit" label={buttonLabel} btnFunction={() => {}} />
            </div>
        </form>
    );
}