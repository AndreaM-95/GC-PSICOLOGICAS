import { useAdminsData } from "@/hooks/useAdminsData";
import { useAdminsSearch } from "@/hooks/useAdminsSearch";
import { useAppToast } from "@/hooks/useAppToast";
import { useProfessionalData } from "@/hooks/useProfessionalData";
import { useProfessionalSearch } from "@/hooks/useProfessionalSearch";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

export default function ListarUsuarios() {
    const { toast, showMessage } = useAppToast();
     //ADMIN
        const { admins, loadAdmins } = useAdminsData(showMessage);
        const { filteredAdmins, searchAdmins } = useAdminsSearch(admins);
    
        //PROFESIONAL
        const { professionals, loadProfessionals } = useProfessionalData(showMessage);
        const { filteredProfessionals, searchProfessionals } = useProfessionalSearch(professionals);
    
        //GENERAL
        const [selectedUser, setSelectedUser] = useState<any>(null);
        const [rol, setRol] = useState<string>("");
        const roles = [
            { id: 1, name: "Administrativo" },
            { id: 2, name: "Profesional" }
        ];
    
        
        const roleConfig = {
            Administrativo: {
                entityName: "administrativo",
                data: admins,
                suggestions: filteredAdmins,
                search: searchAdmins,
                load: loadAdmins,
            },
            Profesional: {
                entityName: "profesional",
                data: professionals,
                suggestions: filteredProfessionals,
                search: searchProfessionals,
                load: loadProfessionals,
            }
        };
        const currentConfig = roleConfig[rol as keyof typeof roleConfig];

    const mapData = (data: any[], rol: string) => {
        return data.map((item) => ({
            ...item,
            fullName: `${item.nombres} ${item.apellidos}`
        }));
    };

    const tableColumns = {
        Administrativo: [
            { field: "fullName", header: "Nombre completo" },
            { field: "tipoDocumento", header: "Tipo documento" },
            { field: "numeroDocumento", header: "Número documento" },
            { field: "ciudadResidencia", header: "Ciudad" },
            { field: "celular", header: "Celular" },
            { field: "correo", header: "Correo" },
            { field: "rol", header: "Rol" },
            { field: "cargo", header: "Cargo" }
        ],
        Profesional: [
            { field: "fullName", header: "Nombre completo" },
            { field: "tipoDocumento", header: "Tipo documento" },
            { field: "numeroDocumento", header: "Número documento" },
            { field: "ciudadResidencia", header: "Ciudad" },
            { field: "celular", header: "Celular" },
            { field: "correo", header: "Correo" },
            { field: "especialidad", header: "Especialidad" },
            { field: "licencia", header: "Licencia" }
        ]
    };

    const columns = tableColumns[rol as keyof typeof tableColumns];
    const data = currentConfig ? mapData(currentConfig.data, rol) : [];

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '90%' }}>
            <div className="w-[80%] m-auto">
                <label className="font-bold text-cyan-700">Selecciona el rol para visualizar los usuarios activos en este:</label>
                <Dropdown
                    value={rol} 
                    onChange={(e) => {
                        setRol(e.value);
                        setSelectedUser(null);
                    }}
                    options={roles}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full mt-2"
                    required
                    aria-label="Selecciona el rol.."
                />
            </div>
            <Divider/>
                        
            {rol && currentConfig && (
                <div className="mt-5">
                    <DataTable value={data} paginator rows={5} responsiveLayout="scroll">
                    {columns.map((col, index) => (
                        <Column
                            key={index}
                            field={col.field}
                            header={col.header}
                            className="text-center"
                        />
                    ))}
                    </DataTable>
                </div>
            )}
        </Card>
    );
}