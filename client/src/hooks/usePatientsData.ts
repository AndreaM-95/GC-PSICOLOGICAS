import { useEffect, useState } from "react";
import { getPatients } from "@/services/patient.service";

export function usePatientsData(showError: (seve:string, msg: string) => void) {
    const [patients, setPatients] = useState<any[]>([]);

    // Cargar pacientes al montar el componente
    useEffect(() => {
        loadPatients();
    }, []);

    async function loadPatients() {
        try {
            const pats = await getPatients();
            setPatients(
                pats.map((p: any) => ({
                    id: p.idPersona,
                    nombres: p.nombres,
                    apellidos: p.apellidos,
                    tipoDocumento: p.tipoDocumento,
                    numeroDocumento: p.numeroDocumento,
                    fechaNacimiento:p.fechaNacimiento,
                    genero:p.genero,
                    ciudadResidencia:p.ciudadResidencia,
                    celular:p.celular,
                    correo:p.correo,
                    eps:p.eps,
                    nombresContactoEmergencia: p.nombresContactoEmergencia,
                    celularContactoEmergencia: p.celularContactoEmergencia 
                }))
            );
        } catch (err: any) {
            console.error("Error cargando pacientes:", err);
            showError("error","Error al cargar los pacientes");
        }
    }

    return {patients, loadPatients}
};


    