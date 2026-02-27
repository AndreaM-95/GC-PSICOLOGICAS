import { useEffect, useState } from "react";
import { getPatients } from "@/services/user.service";

export function usePatientsData(showError: (seve:string, msg: string) => void) {
    const [patients, setPatients] = useState<any[]>([]);

    // Cargar pacientes al montar el componente
    useEffect(() => {
        async function loadPatients() {
            try {
                const pats = await getPatients();
                setPatients(
                    pats.map((p: any) => ({
                        id: p.idPersona,
                        document: p.numeroDocumento,
                        name: `${p.nombres} ${p.apellidos}`,
                    }))
                );
            } catch (err: any) {
                console.error("Error cargando pacientes:", err);
                showError("error","Error al cargar los pacientes");
            }
        }
        loadPatients();
    }, []);

    return {patients}
};