import { useState } from "react";

export function usePatientSearch(patients: any[]) {
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

    const searchPatient = (event: { query: string }) => {
        const query = event.query;
        const filtered = patients.filter(p =>
            p.document.toString().includes(query)
        );
        setFilteredPatients(filtered);
    };

    return { filteredPatients, searchPatient };
}