import { useState } from "react";

export function usePatientSearch(patients: any[]) {
    const [filteredPatients, setFilteredPatients] = useState<any[]>([]);

    /**
     * @description Función que filtra la lista de pacientes basada en el número de documento ingresado por el usuario. La función toma un evento que contiene la consulta de búsqueda, filtra la lista de pacientes para incluir solo aquellos cuyo número de documento contiene la consulta y actualiza el estado `filteredPatients` con los resultados filtrados. Esto permite mostrar sugerencias dinámicas a medida que el usuario escribe en el campo de búsqueda.
     * @param event El parámetro `event` representa el evento de búsqueda, el cual contiene una propiedad `query` que es la cadena de texto ingresada por el usuario para filtrar la lista de pacientes.
     */
    const searchPatient = (event: { query: string }) => {
        const query = event.query;
        const filtered = patients.filter(p =>
            p.numeroDocumento.toString().includes(query)
        );
        setFilteredPatients(filtered);
    };

    return { filteredPatients, searchPatient };
}