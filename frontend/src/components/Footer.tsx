export default function Footer() {
    return (
        <footer className=" w-full bg-cyan-200 p-4 z-50">
            <div className="">
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
