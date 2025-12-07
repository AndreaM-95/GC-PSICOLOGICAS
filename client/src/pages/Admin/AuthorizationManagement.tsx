import Navbar from "../../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import UpdateAppointment from "../../components/Appointments/UpdateAppointment";
import CancelAppointment from "../../components/Appointments/CancelAppointment";
import NavButton from "../../components/NavButton";
import CreateAppointment from "../../components/Appointments/CreateAppointment";
import ListAppointments from "../../components/Appointments/ListAppointments";

export default function AuthorizationManagement() {
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
                <h1 className="text-cyan-700 font-bold text-center text-2xl mx-auto mb-8">Gestión de autorizaciones médicas</h1>
            </header>

            <section className="flex justify-center">
                <TabView>
                    <TabPanel header="Listar autorizaciones">
                        <ListAppointments />
                    </TabPanel>
                    <TabPanel header="Crear autorización">
                        <div className="flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round">
                            <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                            <h3>Sólo médicos</h3>
                        </div>
                    </TabPanel>
                    <TabPanel header="Renovar autorización">
                        <div className="flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round">
                            <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                            <h3>Sólo médicos</h3>
                        </div>
                    </TabPanel>
                </TabView>
            </section>
        </main>
    );
}
