import { InputText } from "primereact/inputtext";
import Navbar from "../../components/Navbar";
import PatientInfoCard from "../../components/PatientInfoCard";
import { Avatar } from "primereact/avatar";
import NavButton from "../../components/NavButton";

export default function Gestiones() {
    return (
        <main>
            <Navbar/>
            <header className="m-auto w-3/4">
                <h1 className="text-cyan-700 font-bold text-2xl mx-auto mt-8 mb-2">Gestión de citas</h1>
                <h2 className="text-cyan-700 text-lg mx-auto">Busca al paciente y gestiona sus citas.</h2>
            </header>

            <div className="w-3/4 m-auto items-center flex mt-2">
                <InputText placeholder="Busca a un paciente.." keyfilter="alphanum" />
                <Avatar icon="pi pi-search" size="large" style={{background: 'white'}} />
            </div>

            <section className="w-1/2 mx-auto mt-4 mb-8">
                <PatientInfoCard patient={{
                    nameUser: "Juan",
                    lastNameUser: "Pérez",
                    documentType: "CC",
                    documentNumber: 123456789,
                    eps: "EPS Sura",
                    state: "Activo"
                }} />
            </section>

            <div className="w-1/2 m-auto mb-8 grid gap-2 grid-cols-4">
                <NavButton label="Ver cita" type={"button"} btnFunction={() => { } }/>
                <NavButton label="Asignar cita" type={"button"} btnFunction={() => { } }/>
                <NavButton label="Reprogramar cita" type={"button"} btnFunction={() => {}} />
                <NavButton label="Cancelar cita" type={"button"} btnFunction={() => {}} />
                <NavButton label="Volver" type={"button"} btnFunction={() => {}} />
            </div>
        </main>
    );
}
