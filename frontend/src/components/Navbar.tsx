import React, { useRef } from 'react'; 
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';
import 'primeicons/primeicons.css';

export default function Navbar() {
    const menuLeft = useRef<Menu>(null);
    const toast = useRef<Toast>(null);
    const items: MenuItem[] = [
        {
            label: '¿Qué deseas hacer?',
            items: [
                {
                    label: 'Inicio',
                    icon: 'pi pi-home'
                },
                {
                    label: 'Perfil',
                    icon: 'pi pi-user'
                },
                {
                    label: 'Salir',
                    icon: 'pi pi-sign-out'
                }
            ]
        }
    ];

    return (
        <nav className="w-full bg-cyan-200 p-2" aria-label="Menú principal">
            <Toast ref={toast} />
            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
            <Button
                text
                icon="pi pi-bars"
                style={{ color: 'var(--color-cyan-700)' }}
                onClick={(event) => menuLeft.current?.toggle(event)}
                aria-controls="popup_menu_left"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Abrir menú de navegación"
            />
        </nav>
    );
}