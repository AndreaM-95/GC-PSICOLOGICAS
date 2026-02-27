import { useEffect, useState } from "react";
import { getPatients, getProfessionals } from "../services/user.service";

export function usePatientProffesionalData(showError: (seve:string, msg: string) => void) {
    const [patients, setPatients] = useState<any[]>([]);
    const [professionals, setProfessionals] = useState<any[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const pats = await getPatients();
                const profs = await getProfessionals();

                setPatients(
                    pats.map((p: any) => ({
                        id: p.idPersona,
                        document: p.numeroDocumento ?? "",
                        name: `${p.nombres} ${p.apellidos}`,
                    }))
                );

                setProfessionals(
                    profs.map((p: any) => ({
                        id: p.profesional.idProfesional,
                        name: `${p.nombres} ${p.apellidos}`,
                        especialidad: p.profesional?.especialidad ?? "N/A",
                    }))
                );
            } catch (err) {
                showError("error","Error al cargar los datos");
            }
        }

        loadData();
    }, []);

    return { patients, professionals };
}