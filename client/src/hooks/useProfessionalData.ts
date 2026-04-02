import { useEffect, useState } from "react";
import { getProfessionals } from "@/services/user.service";

export function useProfessionalData(showError: (seve:string, msg: string) => void) {
    const [professionals, setProfessionals] = useState<any[]>([]);

    // Cargar profesionales al montar el componente
    useEffect(() => {
        loadProfessionals();
    }, []);

    /**
     * @description Función que carga los profesionales desde el backend. Realiza una solicitud para obtener los datos de los profesionales y luego los formatea para incluir un campo `fullName` que concatena los nombres y apellidos. Si ocurre un error durante la carga, se captura el error y se muestra un mensaje de error al usuario utilizando la función `showError`.
     */
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