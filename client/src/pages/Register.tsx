import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { InputMask } from "primereact/inputmask";
import { Calendar } from 'primereact/calendar';
import { ScrollPanel } from 'primereact/scrollpanel';
import '../App.css';
import React from 'react';
import NavButton from '../components/NavButton';
import '../App.css';
import Footer from '@/components/Footer';

interface TypeDocuments {
    id: number;
    name: string;
}

interface Genres {
    id: number;
    name: string;
}

export default function Register() {
    const navigate = useNavigate();
    const [selectedTypeDoc, setSelectedTypeDoc] = useState<TypeDocuments | null>(null);
    const [selectedGenre, setSelectedGenre] = useState<Genres | null>(null);
    const [date, setDate] = useState<Date | null>(null);

    const typeDoc: TypeDocuments[] = [
        { id: 1, name: "Cédula de Ciudadanía" },
        { id: 2, name: "Tarjeta de Identidad" },
        { id: 3, name: "Pasaporte" }
    ];

    const genres: Genres[] = [
        { id: 1, name: "Masculino" },
        { id: 2, name: "Femenino" },
        { id: 3, name: "Otro" }
    ];

    const fields = [
        { label: 'Nombres', component: <InputText placeholder="Digite aquí.." className="w-full" /> },
        { label: 'Apellidos', component: <InputText placeholder="Digite aquí.." className="w-full" /> },
        { label: 'Tipo de documento', component: <Dropdown value={selectedTypeDoc} onChange={(e) => setSelectedTypeDoc(e.value)} options={typeDoc} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" /> },
        { label: 'Número de documento', component: <InputText placeholder="Digite aquí.." keyfilter="num" className="w-full" /> },
        { label: 'Fecha de nacimiento', component: <Calendar value={date} onChange={(e) => setDate(e.value ? e.value : null)} showIcon placeholder="Selecciona aquí.." className="w-full" /> },
        { label: 'Género', component: <Dropdown value={selectedGenre} onChange={(e) => setSelectedGenre(e.value)} options={genres} optionLabel="name" placeholder="Selecciona aquí.." className="w-full" /> },
        { label: 'Ciudad de residencia', component: <InputText placeholder="Digite aquí.." className="w-full" /> },
        { label: 'Dirección de residencia', component: <InputText placeholder="Digite aquí.." className="w-full" /> },
        { label: 'Número de celular', component: <InputMask mask="99-9999999999" placeholder="57-333333333" className="w-full" /> },
        { label: 'Correo electrónico', component: <InputText placeholder="Digite aquí.." className="w-full" /> },
        { label: 'EPS', component: <InputText placeholder="Digite aquí.." className="w-full" /> },
        { label: 'Contacto de emergencia', component: <InputText placeholder="Digite aquí.." className="w-full" /> },
        { label: 'Número contacto de emergencia', component: <InputMask mask="99-9999999999" placeholder="57-333333333" className="w-full" /> },
        { label: 'Cree una contraseña', component: <Password toggleMask placeholder="Ingrese su contraseña.." className="contrasena" /> }
    ];

    const returnToLogin = () => {
        navigate('/login');
    };

    const registerUser = () => {
        //window.open('https://react.dev', '_blank');
    };

    return (
        <main className="flex h-full">
            {/* Imagen decorativa */}
            <div className="w-1/2 flex items-center justify-center">
                <img src="/reg.png" width="450" height="450" alt="Registro de usuario" />
            </div>

            <div className="w-1/2 flex flex-col bg-cyan-200 items-center justify-center h-[850px]">
                <header className="text-center mb-12">
                    <h1 className="text-cyan-700 font-bold text-3xl">Regístrate como paciente activo</h1>
                    <p id="form-description" className="text-cyan-700 text-lg italic">Todos los datos son obligatorios</p>
                </header>
                
                 {/* Formulario de registro */}
                <form
                    className='flex flex-col items-center w-full'
                    aria-describedby="form-description"
                    onSubmit={(e) => {
                        e.preventDefault();
                        registerUser();
                    }}
                >
                    <ScrollPanel style={{ width: '85%', height: '500px' }}>
                        <div className="grid grid-cols-[40%_60%] gap-2 bg-cyan-100 mx-auto rounded-lg px-8 py-4">
                            {fields.map((field, index) => {
                                const inputId = `field-${index}`;
                                return (
                                    <React.Fragment key={index}>
                                        <label
                                            htmlFor={inputId}
                                            className="text-cyan-700 font-bold mb-2 content-center text-sm w-full"
                                        >
                                            {field.label}
                                        </label>
                                        {React.cloneElement(field.component, { id: inputId, required: true })}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </ScrollPanel>

                    <div className="col-span-2 flex justify-center gap-8 mt-6">
                        <NavButton type="button" label="Volver" btnFunction={returnToLogin} />
                        <NavButton type="submit" label="Registrarse" btnFunction={registerUser} />
                    </div>
                </form>
            </div>

            <Footer />
        </main>
    );
}
