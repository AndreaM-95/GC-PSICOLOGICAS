import { useEffect, useState } from "react";
import { getProfessionals } from "@/services/user.service";

export function useProfessionalData(showError: (seve:string, msg: string) => void) {
    const [professionals, setProfessionals] = useState<any[]>([]);

    // Cargar profesionales al montar el componente
    useEffect(() => {
        loadProfessionals();
    }, []);

    async function loadProfessionals() {
        try{
            const profs = await getProfessionals();
            setProfessionals(
                profs.map((p: any) => ({
                    idPersona: p.idPersona,
                    id: p.profesional.idProfesional,
                    nombres: p.nombres,
                    apellidos: p.apellidos,
                    tipoDocumento: p.tipoDocumento,
                    numeroDocumento: p.numeroDocumento,
                    fechaNacimiento: p.fechaNacimiento,
                    genero: p.genero,
                    ciudadResidencia: p.ciudadResidencia,
                    celular: p.celular,
                    correo: p.correo,
                    eps: p.eps,
                    nombresContactoEmergencia: p.nombresContactoEmergencia,
                    celularContactoEmergencia: p.celularContactoEmergencia,
                    especialidad: p.profesional.especialidad,
                    licencia: p.profesional.licencia,
                    contrasena: p.contrasena,
                    rol: p.rol,
                    estado: p.estado,
                }))
            );
        } catch (err: any){
            console.error("Error cargando profesionales:", err);
            showError("error","Error al cargar los profesionales");
        }
    }

    return { professionals, loadProfessionals }
};