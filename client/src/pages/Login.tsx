import { useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import NavButton from '../components/NavButton';
import '../App.css';
import { loginRequest } from '../services/auth.service';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async () => {
        if (event) event.preventDefault();
        try {
            const data = await loginRequest({ email, password });
            console.log("Login OK:", data);

            // Guardar el token REAL que envía tu backend
            if (data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
            }

            navigate("/menu");
        } catch (err: any) {
            setError("Credenciales incorrectas");
            console.error(err);
        }
    }


    const rememberPassword = () => {
        // Logic to remember the password
        window.open('https://react.dev', '_blank')
    }

    const registerUser = () => {
        navigate('/register');
    }

    return (
        <main className="min-h-screen flex">
            <div className="w-1/2 flex items-center justify-center">
                <img src="/login.png" width="450" height="450" alt="Ilustración de inicio de sesión" />
            </div>

            <div className="w-1/2 flex flex-col bg-cyan-200 items-center justify-center">
                <header className="w-3/4 text-center mb-16">
                    <h1 className="text-cyan-700 font-bold text-3xl">
                        ¡Bienvenidos al sistema de gestión de citas!
                    </h1>
                </header>

                <section className="relative w-2/3 bg-cyan-100 mx-auto rounded-lg flex flex-col items-center mb-4 pt-14 pb-8 px-8" aria-labelledby="login-title">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
                        <Avatar
                            icon="pi pi-user"
                            size="xlarge"
                            shape="circle"
                            className="text-white"
                            style={{ backgroundColor: 'var(--primary-color)' }}
                        />
                    </div>

                    <form
                        className="flex flex-col w-full items-center p-0"
                        onSubmit={login}
                        aria-labelledby="login-title"
                    >
                        <fieldset className="w-full border-0 p-0 items-center flex flex-col">
                            <legend id="login-title" className="sr-only">Formulario de inicio de sesión</legend>

                            <label htmlFor="username" className="text-cyan-700 font-bold mb-2 text-center">Usuario</label>
                            <InputText
                                id="username"
                                name="username"
                                type='email'
                                required
                                value={email}
                                placeholder="Ingrese su usuario..."
                                style={{ width: '100%' }}
                                aria-required="true"
                                autoComplete="username"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="password" className="text-cyan-700 font-bold w-full mt-6 mb-2 text-center">Contraseña</label>
                            <Password
                                id="password"
                                name="password"
                                type="password"
                                required
                                variant="filled"
                                style={{ width: '100%', padding: '0' }}
                                feedback={false}
                                toggleMask
                                placeholder="Ingrese su contraseña..."
                                aria-required="true"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={rememberPassword}
                                className="hover:underline text-cyan-700 w-full mt-4 mb-2 text-center text-xs italic cursor-pointer"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>

                            <button
                                type="button"
                                onClick={registerUser}
                                className="hover:underline text-cyan-700 w-full text-center text-xs italic mb-4 cursor-pointer"
                            >
                                ¿No tienes cuenta? Regístrate aquí
                            </button>

                            <NavButton type="submit" label="Ingresar" btnFunction={login} />
                        </fieldset>
                    </form>
                </section>
            </div>
        </main>
    );
}
