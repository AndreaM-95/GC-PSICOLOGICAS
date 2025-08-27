//import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';

export default function Login() {
    //const [value, setValue] = useState<string>('');

    const rememberPassword = () => {
        // Logic to remember the password
        window.open('https://react.dev', '_blank')
    }

    const registerUser = () => {
        // Logic to register the user
        window.open('https://react.dev', '_blank')
    }

    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 flex items-center justify-center">
                <img src="/login.png" width="450" height="450" alt="Login" />
            </div>

            <div className="w-1/2 flex flex-col bg-cyan-200 items-center justify-center">
                <h1 className="text-cyan-700 font-bold w-1/2 text-3xl text-center mx-auto mb-16">
                    ¡Bienvenidos al sistema de gestión de citas!
                </h1>

                {/* contenedor del formulario: importante -> relative + pt-14 */}
                <div className="relative w-2/3 bg-cyan-100 mx-auto rounded-lg flex flex-col items-center mb-4 pt-14 pb-8 px-8">

                    {/* avatar flotando, centrado y saliendo por arriba */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                        <Avatar
                            icon="pi pi-user"
                            size="xlarge"
                            shape="circle"
                            className="text-white"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />
                    </div>

                    <label htmlFor="username" className='text-cyan-700 font-bold w-full mb-2 text-center'>Usuario</label> 
                    <InputText id="username" placeholder='Ingrese su usuario..' className=' h-11 w-70' invalid:border-pink-500 invalid:text-pink-600/> 
                    
                    <label htmlFor="password" className='text-cyan-700 font-bold w-full mt-6 mb-2 text-center'>Contraseña</label> 
                    <Password className='h-11' id='password' variant="filled" feedback={false} toggleMask placeholder='Ingrese su contraseña..' />

                    <a onClick={rememberPassword}
                    className="hover:underline text-cyan-700 w-full mt-4 mb-2 text-center cursor-pointer text-xs italic">
                    ¿Olvidaste tu contraseña?
                    </a>

                    <a onClick={registerUser}
                    className="hover:underline text-cyan-700 w-full text-center cursor-pointer text-xs italic">
                    ¿No tienes cuenta?, regístrate aquí
                    </a>
                </div>
                <Button label="Ingresar" className='w-32 shadow-md'/>
            </div>
        </div>
    );
}
