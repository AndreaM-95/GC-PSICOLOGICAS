import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { InputNumber } from "primereact/inputnumber";
import { AutoComplete } from 'primereact/autocomplete';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Divider } from "primereact/divider";
import { cancelAppointmentRequest } from "../../services/appointments.service";
import type { ICancelarCita } from "../../types";

import { UseInputValidation } from "@/utils/InputValidation";
import { flujoCitas } from "@/hooks/flujoCitas";
import NavButton from "@/components/NavButton";
import { useAppToast } from "@/hooks/useAppToast";

export default function CancelarCita() {
    const { toast, showMessage } = useAppToast();
    const [reason, setReason] = useState("");
    const {
        filteredPatients,
        selectedPatient,
        appointments,
        selectedAppointment,
        searchPatient,
        selectPatient,
        selectAppointment,
        reset
    } = flujoCitas();

    /**
     * @description Canelación de la cita tomando datos como el id y el motivo
     * @param e Evento del envío del formulario
     * @returns 
     */
    const cancelAppointment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPatient || !selectedAppointment || !reason) {
            showMessage("error", "Todos los campos son obligatorios.");
            return;
        }

        const cancelData: ICancelarCita = {
            idCita: selectedAppointment.idCita,
            motivo: reason
        };

        try {
            await cancelAppointmentRequest(cancelData);
            showMessage("success", "Cita cancelada con éxito.");
            await selectPatient(selectedPatient); // Refrescar citas del paciente
            setReason("");
            reset();

        } catch (error: any) {
            console.error(error.response?.data?.message);
            showMessage("error", "Error al cancelar la cita.");
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "short",
            day: "numeric"
        };
        return new Date(dateString).toLocaleDateString("es-ES", options);
    };

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '100%' }} >
            <Toast ref={toast} />
            <form 
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={cancelAppointment}
            >
                <AutoComplete
                    suggestions={filteredPatients}
                    completeMethod={(e) => searchPatient(e.query)}
                    field="document"
                    onSelect={(e) => selectPatient(e.value)}
                    placeholder="Ingrese documento del paciente"
                    dropdown
                    className="col-span-2"
                />

                <Divider className="col-span-2"/>

                <label htmlFor="patient" className="font-bold text-cyan-700">Paciente:</label>
                <InputText
                    value={selectedPatient?.name || ""}
                    readOnly
                />

                <label htmlFor="codAppointment" className="font-bold text-cyan-700">Código de la cita seleccionada:</label>
                <InputNumber
                    value={selectedAppointment?.idCita || 0}
                    readOnly
                />

                <label htmlFor="reason" className="font-bold text-cyan-700">Motivo de cancelación:</label>
                <InputText
                    value={reason}
                    onChange={UseInputValidation(setReason, "letters")}
                    placeholder="Escribe aquí..."
                    required
                />

                <label className="font-bold text-cyan-700">Citas activas del paciente:</label>
                <div className="card">
                    {appointments.length > 0 ? (
                        <DataTable
                            value={appointments}
                            selectionMode="single"
                            selection={selectedAppointment}
                            onSelectionChange={(e) =>
                                selectAppointment(e.value)
                            }
                            dataKey="idCita"
                            responsiveLayout="scroll"
                        >
                            <Column field="idCita" header="COD" />
                            <Column
                                field="fechaCita"
                                header="Fecha"
                                body={(rowData) =>
                                    formatDate(rowData.fechaCita)
                                }
                            />
                            <Column field="horaCita" header="Hora" />
                            <Column field="estado" header="Estado" />
                        </DataTable>
                    ) : (
                        <Card className="text-center">
                            No hay citas activas
                        </Card>
                    )}
                </div>

                <div className="col-span-2 flex justify-end">
                    <NavButton
                        type="submit"
                        label="Cancelar cita"
                        btnFunction={() => {}}
                    />
                </div>
            </form>
        </Card>
    );
}