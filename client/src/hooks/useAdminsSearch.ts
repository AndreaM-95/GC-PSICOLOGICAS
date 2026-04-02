import { useState } from "react";

export function useAdminsSearch(admins: any[]) {
    const [filteredAdmins, setFilteredAdmins] = useState<any[]>([]);

    /**
     * @description Función que filtra la lista de administrativos basada en el número de documento ingresado por el usuario. La función toma un evento que contiene la consulta de búsqueda, filtra la lista de administrativos para incluir solo aquellos cuyo número de documento contiene la consulta y actualiza el estado `filteredAdmins` con los resultados filtrados. Esto permite mostrar sugerencias dinámicas a medida que el usuario escribe en el campo de búsqueda.
     * @param event 
     */
    const searchAdmins = (event: { query: string }) => {
        const query = event.query;
        const filtered = admins.filter(p =>
            p.numeroDocumento.toString().includes(query)
        );
        setFilteredAdmins(filtered);
    };

    return { filteredAdmins, searchAdmins };
}