import { useEffect, useState } from "react";
import { getAdmins } from "@/services/user.service";

export function useAdminsData(showError: (seve:string, msg: string) => void) {
    const [admins, setAdmins] = useState<any[]>([]);

    // Cargar administrativos al montar el componente
    useEffect(() => {
        loadAdmins();
    }, []);

    /**
     * @description Función que carga los administrativos desde el backend. Realiza una solicitud para obtener los datos de los administrativos y luego los formatea para incluir un campo `fullName` que concatena los nombres y apellidos. Si ocurre un error durante la carga, se captura el error y se muestra un mensaje de error al usuario utilizando la función `showError`.
     */
    async function loadAdmins() {
        try{
            const admins = await getAdmins();
            setAdmins(
                admins.map((p: any) => ({
                    idPersona: p.idPersona,
                    id: p.administrativo.idAdministrativo,
                    nombres: p.nombres,
                    apellidos: p.apellidos,
                    tipoDocumento: p.tipoDocumento,
                    numeroDocumento: p.numeroDocumento,
                    fechaNacimiento: p.fechaNacimiento,
                    genero: p.genero,
                    ciudadResidencia: p.ciudadResidencia,
                    celular: p.celular,
                    eps: p.eps,
                    nombresContactoEmergencia: p.nombresContactoEmergencia,
                    celularContactoEmergencia: p.celularContactoEmergencia,
                    correo: p.correo,
                    contrasena: p.contrasena,
                    cargo: p.administrativo.cargo,
                }))
            );
        } catch (err: any){
            console.error("Error cargando administrativos:", err);
            showError("error","Error al cargar los administrativos");
        }
    }

    return { admins, loadAdmins }
};