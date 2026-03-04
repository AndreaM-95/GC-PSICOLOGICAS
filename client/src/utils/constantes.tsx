
export function constantes() {
    const tiposDocumentos = [
        { id: 1, name: "CC" },
        { id: 2, name: "TI" },
        { id: 2, name: "CE" }
    ];

    const generos = [
        { id: 1, name: "femenino" },
        { id: 2, name: "masculino" },
        { id: 2, name: "otro" }
    ];

    const modalidades = [
        { id: 1, name: "Presencial" },
        { id: 2, name: "Virtual" }
    ];

    const consultorios = [
        { id: 1, name: "Consultorio 1" },
        { id: 2, name: "Consultorio 2" },
    ];
    return { tiposDocumentos, generos, modalidades,consultorios };
}