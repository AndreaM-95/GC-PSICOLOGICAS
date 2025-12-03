import AppointmentManagementCard from "../../components/AppointmentManagementCard";
import Navbar from "../../components/Navbar";

export default function AppointmentManagement() {
    return (
        <main>
            <header className="m-auto">
                <Navbar/>
                <h1 className="text-cyan-700 font-bold text-center text-2xl mx-auto my-8">Agendamiento de cita médica</h1>
            </header>

            <section className="flex justify-center content-center">
                <AppointmentManagementCard />
            </section>
        </main>
    );
}
