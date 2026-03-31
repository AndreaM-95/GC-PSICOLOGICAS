import { useEffect, useState } from "react";
import { getAdmins } from "@/services/user.service";


export function useAdminsData(showError: (seve:string, msg: string) => void) {
    const [admins, setAdmins] = useState<any[]>([]);

    // Cargar administrativos al montar el componente
    useEffect(() => {
        loadAdmins();
    }, []);

    async function loadAdmins() {
        try{
            const profs = await getAdmins();
            setAdmins(
                profs.map((p: any) => ({
                    idPersona: p.idPersona,
                    idAdmin: p.administrativo.idAdministrativo,
                    nombres: p.nombres,
                    apellidos: p.apellidos,
                    tipoDocumento: p.tipoDocumento,
                    numeroDocumento: p.numeroDocumento,
                    ciudadResidencia: p.ciudadResidencia,
                    celular: p.celular,
                    correo: p.correo,
                    rol: p.rol,
                    cargo: p.administrativo.cargo
                }))
            );
        } catch (err: any){
            console.error("Error cargando administrativos:", err);
            showError("error","Error al cargar los administrativos");
        }
    }

    return { admins, loadAdmins }
};