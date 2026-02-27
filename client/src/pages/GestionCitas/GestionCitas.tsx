import Navbar from "../../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import NavButton from "@/components/NavButton";
import ReprogramarCita from "@/components/GestionCitas/ReprogramarCita";
import CancelarCita from "@/components/GestionCitas/CancelarCita";
import CrearCita from "@/components/GestionCitas/CrearCita";
import ListarCitas from "@/components/GestionCitas/ListarCitas";

export default function GestionCitas() {
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
                        <CrearCita />
                    </TabPanel>
                    <TabPanel header="Listar citas">
                        <ListarCitas />
                    </TabPanel>
                    <TabPanel header="Reprogramar cita">
                        <ReprogramarCita />
                    </TabPanel>
                    <TabPanel header="Cancelar cita">
                        <CancelarCita />
                    </TabPanel>
                </TabView>
            </section>
        </main>
    );
}