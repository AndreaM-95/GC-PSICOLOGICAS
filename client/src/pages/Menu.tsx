import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import 'primeicons/primeicons.css';
import MenuCard from "@/components/MenuCard";
import Navbar from "@/components/Navbar";
import { Divider } from "primereact/divider";

interface DecodedToken {
    name: string;
    role: string;
}

export default function Menu() {

    const [role, setRole] = useState<string | null>(null);
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            const decoded: DecodedToken = jwtDecode(token);
            setRole(decoded.role);
            setName(decoded.name);
        }
    }, []);

    const DataMenu = [
        {
            icon: "pi pi-user-plus",
            title: "Gestión del personal",
            subtitle: "Accede a la información del personal activo.",
            url: "/gestionPersonal",
            roles: ["administrativo"]
        },
        {
            icon: "pi pi-users",
            title: "Gestión del paciente",
            subtitle: "Accede a la información del paciente.",
            url: "/gestionPaciente",
            roles: ["administrativo"]
        },
        {
            icon: "pi pi-heart",
            title: "Gestión de citas",
            subtitle: "Accede a la gestión de una cita médica.",
            url: "/gestionCitas",
            roles: ["administrativo", "paciente"]
        },
        // {
        //     icon: "pi pi-address-book",
        //     title: "Gestión de la historia clínica",
        //     subtitle: "Accede a la historia clínica de los pacientes.",
        //     url: "/gestionHistoria",
        //     roles: ["administrativo", "profesional"]
        // },
        // {
        //     icon: "pi pi-file-check",
        //     title: "Gestión de las autorizaciones",
        //     subtitle: "Accede a las autorizaciones pendientes de los pacientes.",
        //     url: "/gestionMedicamento",
        //     roles: ["administrativo", "profesional", "paciente"]
        // }
    ];

    const filteredMenu = DataMenu.filter(item =>
        role ? item.roles.includes(role.toLowerCase()) : false
    );

    return (
        <main className='h-screen'>
            <Navbar/>

            <section className="w-3/4 2xl:w-[60%] mx-auto flex flex-wrap items-center justify-around">
                <div className='w-full my-10'>
                    <h1 className="text-cyan-700 font-bold text-3xl mb-2 text-center">
                        Bienvenidos al sistema de gestión de citas
                    </h1>
                    <Divider/>
                    <h2 className="text-cyan-700 font-bold text-xl mt-2">
                        ¡Hola {name}!
                    </h2>
                    <h3 className="text-cyan-600 text-lg">
                        ¿Qué necesitas hacer hoy?
                    </h3>
                </div>

                <section className="my-auto">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {filteredMenu.map((item, index) => (
                            <li key={index}>
                                <MenuCard
                                    icon={item.icon}
                                    title={item.title}
                                    description={item.subtitle}
                                    url={item.url}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
            </section>
        </main>
    );
}