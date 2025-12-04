import Navbar from "../../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import UpdateAppointment from "../../components/Appointmes/UpdateAppointment";
import CancelAppointment from "../../components/Appointmes/CancelAppointment";
import NavButton from "../../components/NavButton";
import CreateAppointment from "../../components/Appointmes/CreateAppointment";
import ListAppointments from "../../components/Appointmes/ListAppointments";

export default function AppointmentManagement() {
    const navigate = useNavigate();
    
    const returnMenu = () => {
        navigate('/menu');
    };

    return (
        <main>
            <header className="m-auto">
                <Navbar/>
                <div className="flex justify-end mt-4 pr-6">
                    <NavButton type="button" label="Volver" icon="pi pi-arrow-left" btnFunction={returnMenu}/>
                </div>
                <h1 className="text-cyan-700 font-bold text-center text-2xl mx-auto mb-8">Gestión de citas médicas</h1>
            </header>

            <section className="flex justify-center">
                <TabView>
                    <TabPanel header="Agendar cita">
                        <CreateAppointment />
                    </TabPanel>
                    <TabPanel header="Listar citas">
                        <ListAppointments />
                    </TabPanel>
                    <TabPanel header="Reprogramar cita">
                        <UpdateAppointment />
                    </TabPanel>
                    <TabPanel header="Cancelar cita">
                        <CancelAppointment />
                    </TabPanel>
                </TabView>
            </section>
        </main>
    );
}
