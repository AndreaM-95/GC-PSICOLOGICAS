import MenuCard from "../components/MenuCard";
import 'primeicons/primeicons.css';
import Navbar from "../components/Navbar";

const DataMenu = [
    {
        icon: "pi pi-user-plus",
        title: "Gestión del personal",
        subtitle: "Accede a la información del personal activo.",
        url: "/perfil"
    },
    {
        icon: "pi pi-users",
        title: "Gestión del paciente",
        subtitle: "Accede a la información del paciente.",
        url: "/citas"
    },
    {
        icon: "pi pi-heart",
        title: "Gestión de citas",
        subtitle: "Accede a la gestión de una cita médica.",
        url: "/configuracion"
    },
    {
        icon: "pi pi-address-book",
        title: "Gestión de la historia clínica",
        subtitle: "Accede a la historia clínica de los pacientes.",
        url: "/configuracion"
    },
    {
        icon: "pi pi-file-check",
        title: "Gestión de las autorizaciones",
        subtitle: "Accede a las autorizaciones pendientes de los pacientes.",
        url: "/autorizaciones"
    }
];

export default function Menu() {
    //TODO: Implementar el nombre del usuario
    return (
        <main>
            <Navbar/>
            <header className="m-auto w-3/4">
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">¡Hola Camilo!</h1>
                <h2 className="text-cyan-700 font-bold text-lg mx-auto">¿Qué necesitas hacer hoy?</h2>
            </header>

            <section className="w-3/4 mx-auto my-8">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                    {DataMenu.map((item, index) => (
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
        </main>
    );
}