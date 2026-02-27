import Navbar from "../../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import NavButton from "../../components/NavButton";
import CreatePersonnel from "../../components/Personnel/CreatePersonnel";

export default function GestionPersonal() {
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
                <h1 className="text-cyan-700 font-bold text-center text-2xl mx-auto mb-8">Gestión del personal</h1>
            </header>

            <section className="flex justify-center mb-[100px]">
                <TabView>
                    <TabPanel header="Crear administrativo o médico">
                        <CreatePersonnel />
                    </TabPanel>
                    <TabPanel header="Listar personal activo">
                        <div className="flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round">
                            <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                            <h3>Póximamente</h3>
                        </div>
                        {/* <ListAppointments /> */}
                    </TabPanel>
                    <TabPanel header="Actualizar personal">
                        <div className="flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round">
                            <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                            <h3>Póximamente</h3>
                        </div>
                        {/* <UpdateAppointment /> */}
                    </TabPanel>
                    <TabPanel header="Inactivar personal">
                        <div className="flex text-center align-items-center justify-content-center bg-[#f1faee] p-5 border-round">
                            <i className="pi pi-info-circle mr-2" style={{fontSize: '1.5rem', color: 'var(--primary-color)'}}></i>
                            <h3>Póximamente</h3>
                        </div>
                        {/* <CancelAppointment /> */}
                    </TabPanel>
                </TabView>
            </section>
        </main>
    );
}
