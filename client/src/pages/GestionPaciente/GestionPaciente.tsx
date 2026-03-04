import Navbar from "@/components/Navbar";
import { useNavigate } from 'react-router-dom';
import { TabView, TabPanel } from 'primereact/tabview';
import NavButton from "@/components/NavButton";
import ListarPacientes from "@/components/GestionPaciente/ListarPacientes";
import InactivarPaciente from "@/components/GestionPaciente/InactivarPaciente";
import CrearPaciente from "@/components/GestionPaciente/CrearPaciente";
import ActualizarPaciente from "@/components/GestionPaciente/ActualizarPaciente";

export default function GestionPaciente() {
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
                <h1 className="text-cyan-700 font-bold text-center text-2xl mx-auto mb-8">Gestión de los pacientes</h1>
            </header>

            <section className="flex justify-center">
                <TabView>
                    <TabPanel header="Crear paciente">
                        <CrearPaciente />
                    </TabPanel>
                    <TabPanel header="Listar pacientes">
                        <ListarPacientes/>
                    </TabPanel>
                    <TabPanel header="Actualizar paciente">
                        <ActualizarPaciente/>
                    </TabPanel>
                    <TabPanel header="Inactivar paciente">
                        <InactivarPaciente/>
                    </TabPanel>
                </TabView>
            </section>
        </main>
    );
}