import { useState } from "react";

export function useProfessionalSearch(professionals: any[]) {
    const [filteredProfessionals, setFilteredProfessionals] = useState<any[]>([]);

    const searchProfessionals = (event: { query: string }) => {
        const query = event.query;
        const filtered = professionals.filter(p =>
            p.numeroDocumento.toString().includes(query)
        );
        setFilteredProfessionals(filtered);
    };

    return { filteredProfessionals, searchProfessionals };
}