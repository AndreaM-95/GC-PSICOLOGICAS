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
                    ciudadResidencia: p.ciudadResidencia,
                    celular: p.celular,
                    correo: p.correo,
                    especialidad: p.profesional.especialidad,
                    licencia: p.profesional.licencia,
                }))
            );
        } catch (err: any){
            console.error("Error cargando profesionales:", err);
            showError("error","Error al cargar los profesionales");
        }
    }

    return { professionals, loadProfessionals }
};