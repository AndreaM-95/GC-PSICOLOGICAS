import { useEffect, useState } from "react";

export default function Footer() {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;

      // Si el contenido NO supera el alto de la pantalla => footer fijo
      setIsFixed(bodyHeight <= windowHeight);
    };

    handleResize(); // ejecutar al montar
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      className={`w-full bg-cyan-200 p-4 z-50 ${
        isFixed ? "fixed bottom-0 left-0" : "relative"
      }`}
    >
      <div>
        <a className="hover:underline text-cyan-500 font-bold cursor-pointer text-sm">
          ¿Necesitas ayuda?, contáctanos
        </a>

        <p className="text-sm text-cyan-700">
          &copy; {new Date().getFullYear()} OL Studios. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
