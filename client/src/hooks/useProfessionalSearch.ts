import { useState } from "react";

export function useProfessionalSearch(professionals: any[]) {
    const [filteredProfessionals, setFilteredProfessionals] = useState<any[]>([]);

    /**
     * @description Función que filtra la lista de profesionales basada en el número de documento ingresado por el usuario. La función toma un evento que contiene la consulta de búsqueda, filtra la lista de profesionales para incluir solo aquellos cuyo número de documento contiene la consulta y actualiza el estado `filteredProfessionals` con los resultados filtrados. Esto permite mostrar sugerencias dinámicas a medida que el usuario escribe en el campo de búsqueda.
     * @param event Paramámetro que representa el evento de búsqueda, el cual contiene una propiedad `query` que es la cadena de texto ingresada por el usuario para filtrar la lista de profesionales. La función utiliza esta consulta para realizar el filtrado de la lista y actualizar el estado con los resultados correspondientes.
     */
    const searchProfessionals = (event: { query: string }) => {
        const query = event.query;
        const filtered = professionals.filter(p =>
            p.numeroDocumento.toString().includes(query)
        );
        setFilteredProfessionals(filtered);
    };

    return { filteredProfessionals, searchProfessionals };
}