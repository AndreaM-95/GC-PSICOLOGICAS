import { Avatar } from "primereact/avatar";

export default function Navbar() {
    return (
        <nav className="flex justify-end w-full bg-cyan-200 p-4">
            <Avatar icon= "pi pi-user" className="text-white p-overlay-badge"
                style={{ backgroundColor: 'var(--primary-color)', marginRight: '1rem' }}
                onClick={() => {}}
            />

            <Avatar icon= "pi pi-sign-out" className="text-white p-overlay-badge"
                style={{ backgroundColor: 'var(--primary-color)', marginRight: '1rem' }}
                onClick={() => {}}
            />
        </nav>
    );
}