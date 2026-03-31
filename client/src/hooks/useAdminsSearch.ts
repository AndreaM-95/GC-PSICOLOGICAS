import { useState } from "react";

export function useAdminsSearch(admins: any[]) {
    const [filteredAdmins, setFilteredAdmins] = useState<any[]>([]);

    const searchAdmins = (event: { query: string }) => {
        const query = event.query;
        const filtered = admins.filter(p =>
            p.numeroDocumento.toString().includes(query)
        );
        setFilteredAdmins(filtered);
    };

    return { filteredAdmins, searchAdmins };
}