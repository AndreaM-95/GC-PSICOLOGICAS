import { useRef } from "react";
import { Toast } from "primereact/toast";

export function useAppToast() {
    const toast = useRef<Toast>(null);

    /**
     * @description Alerta tipo mensaje
     * @param typeSeverity success | info | warn | error | secondary | contrast
     * @param detail mensaje descriptivo
     */
    const showMessage = (typeSeverity:any, detail: string) => {
        toast.current?.show({
            severity: typeSeverity,
            summary: detail,
            life: 2000
        });
    };

    return { toast, showMessage };
}