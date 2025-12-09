import 'primeicons/primeicons.css';
import MenuCard from "@/components/MenuCard";
import Navbar from "@/components/Navbar";

export default function Menu() {
    const DataMenu = [
        {
            icon: "pi pi-user-plus",
            title: "Gestión del personal",
            subtitle: "Accede a la información del personal activo.",
            url: "/personnelManagement"
        },
        {
            icon: "pi pi-users",
            title: "Gestión del paciente",
            subtitle: "Accede a la información del paciente.",
            url: "/patientsManagement"
        },
        {
            icon: "pi pi-heart",
            title: "Gestión de citas",
            subtitle: "Accede a la gestión de una cita médica.",
            url: "/appointmentManagement"
        },
        {
            icon: "pi pi-address-book",
            title: "Gestión de la historia clínica",
            subtitle: "Accede a la historia clínica de los pacientes.",
            url: "/summaryHistory"
        },
        {
            icon: "pi pi-file-check",
            title: "Gestión de las autorizaciones",
            subtitle: "Accede a las autorizaciones pendientes de los pacientes.",
            url: "/authorizationManagement"
        }
    ];
    
    return (
        <main className='h-screen'>
            <Navbar/>

            <section className="w-3/4 2xl:w-[60%] mx-auto flex flex-wrap items-center justify-around" aria-label="Menú principal de opciones">
                <div className='w-full my-10'>
                    <h1 className="text-cyan-700 font-bold text-2xl mb-2">¡Hola Camilo!</h1>
                    <h2 className="text-cyan-700 font-bold text-lg">¿Qué necesitas hacer hoy?</h2>
                </div>

                <section className="my-auto">
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
            </section>
        </main>
    );
}