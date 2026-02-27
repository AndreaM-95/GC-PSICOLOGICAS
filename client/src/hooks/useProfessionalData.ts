import { useEffect, useState } from "react";
import { getProfessionals } from "@/services/user.service";


export function useProfessionalData(showError: (seve:string, msg: string) => void) {
    const [professionals, setProfessionals] = useState<any[]>([]);

    // Cargar profesionales al montar el componente
    useEffect(() => {
        async function loadProfessionals() {
            try{
                const profs = await getProfessionals();
                setProfessionals(
                    profs.map((p: any) => ({
                        id: p.profesional.idProfesional,
                        name: `${p.nombres} ${p.apellidos}`
                    }))
                );
            } catch (err: any){
                console.error("Error cargando profesionales:", err);
                showError("error","Error al cargar los profesionales");
            }
        }
        loadProfessionals();
    }, []);

    return {professionals}
};