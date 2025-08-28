import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { InputMask } from "primereact/inputmask";
import { Calendar } from 'primereact/calendar';
import { ScrollPanel } from 'primereact/scrollpanel';
import '../App.css'

// interface NewUser {
//     nameUser: string,
//     lastNameUser: string,
//     documentType: string,
//     documentNumber: number,
//     birthdate: Date,
//     genere: string,
//     cityResidence: string,
//     celphone: number,
//     email: string,
//     eps: string,
//     nameEmergencyContact: string,
//     phoneEmergencyContact: number,
//     state: string
// }

interface TypeDocuments{
    id: number,
    name: string
}

interface Genres{
    id: number,
    name: string
}

export default function Register() {
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

    const returnToLogin = () => {
        // Logic to remember the password
        window.open('https://react.dev', '_blank')
    }

    const registerUser = () => {
        // Logic to register the user
        window.open('https://react.dev', '_blank')
    }
    return(
        <div className="flex">
            <div className="w-1/2 flex items-center justify-center">
                <img src="/reg.png" width="450" height="450" alt="Login" />
            </div>

            <div className="w-1/2 flex flex-col bg-cyan-200 items-center justify-center">
                <h1 className="text-cyan-700 font-bold w-3/4 text-3xl text-center mx-auto mb-2 mt-4">
                    Regístrate como paciente activo
                </h1>

                <h3 className="text-cyan-700 w-1/2 text-lg italic text-center mb-4 mx-auto">
                    Todos los datos son obligatorios
                </h3>

                <ScrollPanel style={{ width: '85%', height: '400px' }} className=''>
                    <div className="grid grid-cols-[40%_60%] gap-2 bg-cyan-100 mx-auto rounded-lg px-8 py-4">

                        <label htmlFor="usernames" className='text-cyan-700 w-full font-bold mb-2 content-center'>Nombres</label> 
                        <InputText id="usernames" placeholder='Digite aquí..' className='w-full'/> 
                        
                        <label htmlFor="lastNames" className='text-cyan-700 w-full font-bold mb-2 content-center'>Apellidos</label> 
                        <InputText id="lastNames" placeholder='Digite aquí..' className='w-full'/> 

                        <label htmlFor="lastNames" className='text-cyan-700 w-full font-bold mb-2 content-center'>Tipo de documento</label>
                        <Dropdown value={selectedTypeDoc} onChange={(e) => setSelectedTypeDoc(e.value)} options={typeDoc} optionLabel="name" placeholder="Selecciona aquí.." className="w-full md:w-14rem" />

                        <label htmlFor="lastNames" className='text-cyan-700 w-full font-bold mb-2 content-center'>Número de documento</label>
                        <InputText id="documentNumber" placeholder='Digite aquí..' keyfilter="num" className='w-full' />

                        <label htmlFor="dateOfBirth" className='text-cyan-700 w-full font-bold mb-2 content-center'>Fecha de nacimiento</label>
                        <Calendar id="buttondisplay" placeholder='Selecciona aquí..' value={date} showIcon />

                        <label htmlFor="gender" className='text-cyan-700 w-full font-bold mb-2 content-center'>Género</label>
                        <Dropdown value={selectedGenre} onChange={(e) => setSelectedGenre(e.value)} options={genres} optionLabel="name" placeholder="Selecciona aquí.." className="w-full md:w-14rem" />

                        <label htmlFor="cityResidence" className='text-cyan-700 w-full font-bold mb-2 content-center'>Ciudad de residencia</label> 
                        <InputText id="cityResidence" placeholder='Digite aquí..' className='w-full'/> 

                        <label htmlFor="address" className='text-cyan-700 w-full font-bold mb-2 content-center'>Dirección de residencia</label> 
                        <InputText id="address" placeholder='Digite aquí..' className='w-full'/> 

                        <label htmlFor="cellPhone" className='text-cyan-700 w-full font-bold mb-2 content-center'>Número de celular</label>
                        <InputMask mask="99-9999999999" placeholder="57-333333333" />

                        <label htmlFor="email" className='text-cyan-700 w-full font-bold mb-2 content-center'>Correo electrónico</label> 
                        <InputText id="email" placeholder='Digite aquí..' className='w-full'/>

                        <label htmlFor="eps" className='text-cyan-700 w-full font-bold mb-2 content-center'>EPS</label> 
                        <InputText id="eps" placeholder='Digite aquí..' className='w-full'/> 

                        <label htmlFor="emergencyContact" className='text-cyan-700 w-full font-bold mb-2 content-center'>Contacto de emergencia</label> 
                        <InputText id="emergencyContact" placeholder='Digite aquí..' className='w-full'/> 

                        <label htmlFor="cellPhone" className='text-cyan-700 w-full font-bold mb-2 content-center'>Número contacto de emergencia</label>
                        <InputMask mask="99-9999999999" placeholder="57-333333333" />

                        <label htmlFor="password" className='text-cyan-700 font-bold w-full mb-2 content-center'>Cree una ontraseña</label> 
                        <Password className='w-full' id='password' toggleMask placeholder='Ingrese su contraseña..' />
                    </div>
                </ScrollPanel>

                <div className='flex gap-8 mb-4 mt-4 pb-4'>
                    <Button label="Volver" className='w-32 shadow-md' onClick={returnToLogin}/>
                    <Button label="Registrarse" className='w-32 shadow-md' onClick={registerUser}/>   
                </div>
            </div>
        </div>
    )
}