
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
    return { tiposDocumentos, generos };
}