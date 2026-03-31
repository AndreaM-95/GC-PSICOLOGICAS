import { confirmDialog } from "primereact/confirmdialog";

interface ConfirmDeactivateParams {
  entityName: string; // "paciente", "profesional", etc
  fullName: string;
  onAccept: () => Promise<void>;
}

export const useConfirmDeactivate = () => {
  const confirmDeactivate = ({
    entityName,
    fullName,
    onAccept
  }: ConfirmDeactivateParams) => {
    confirmDialog({
      message: `¿Segur@ que desea inactivar al ${entityName} ${fullName}?`,
      header: "Confirmar inactivación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí, inactivar",
      rejectLabel: "Cancelar",
      accept: async () => {
        await onAccept();
      }
    });
  };

  return { confirmDeactivate };
};