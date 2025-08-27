export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-transparent p-4 z-50">
            <div className="container">
                <a
                    className="hover:underline text-cyan-500 font-bold cursor-pointer text-sm">
                    ¿Necesitas ayuda?, contáctanos
                </a>

                <p className="text-sm text-cyan-700">
                    &copy; {new Date().getFullYear()} OL Studios. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
