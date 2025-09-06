import AppointmentManagementCard from "../../components/AppointmentManagementCard";
import Navbar from "../../components/Navbar";

export default function AppointmentManagement() {
    return (
        <main>
            <Navbar/>
            <header className="m-auto w-3/4">
                <h1 className="text-cyan-700 font-bold text-center text-2xl mx-auto mt-8 mb-2">Solicita una cita médica</h1>
            </header>

            <section className="w-1/2 mx-auto mt-4 mb-8">
                <AppointmentManagementCard isActiveProp={true} />
            </section>
        </main>
    );
}
