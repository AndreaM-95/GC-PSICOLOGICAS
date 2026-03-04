import React, { useState } from "react";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import NavButton from "@/components/NavButton";
import { AutoComplete } from "primereact/autocomplete";
import { Divider } from "primereact/divider";
import { useAppToast } from "@/hooks/useAppToast";
import { usePatientSearch } from "@/hooks/usePatientSearch";
import { usePatientProffesionalData } from "@/hooks/usePatientProffesionalData";
import { useCreateAppointmentForm } from "@/hooks/useCreateAppointmentForm";
import { constantes } from "@/utils/constantes";

export default function CrearCita() {
    const { toast, showMessage } = useAppToast();
    const { patients, professionals } = usePatientProffesionalData(showMessage);
    const { filteredPatients, searchPatient } = usePatientSearch(patients);
    const [patient, setPatient] = useState("");
    const [documentPatient, setDocumentPatient] = useState("");
    const { modalidades, consultorios } = constantes();
    
    /**
     * @description Selección del paciente y visualización de su nombre en el input
     * @param e 
     */
    const onPatientSelect = (e: { value: any }) => {
        const selected = e.value;
        setSelectedPatient(selected);
        setPatient(selected.name ?? "");
        setDocumentPatient(selected.document);
    };
    
    const {
        selectedPatient,
        setSelectedPatient,
        selectedProfessional,
        setSelectedProfessional,
        date,
        setDate,
        time,
        setTime,
        placeMeeting,
        setPlaceMeeting,
        spaceMeeting,
        setSpaceMeeting,
        reason,
        setReason,
        createAppointment
    } = useCreateAppointmentForm(showMessage, showMessage);

    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto', width: '100%' }} >
            <Toast ref={toast} />
            <form
                className="grid gap-2 align-middle items-center"
                style={{ gridTemplateColumns: '35% 65%' }}
                onSubmit={createAppointment}
            >
                <AutoComplete
                    id="documentPatient"
                    value={documentPatient}
                    suggestions={filteredPatients}
                    completeMethod={searchPatient}
                    field="document"
                    onChange={(e) => setDocumentPatient(e.value)}
                    onSelect={onPatientSelect}
                    placeholder="Ingrese documento del paciente"
                    aria-label="Buscar paciente por documento"
                    dropdown
                    className="col-span-2"
                />
                <Divider className="col-span-2"/>

                <label htmlFor="patientName" className="font-bold text-cyan-700">Paciente seleccionado:</label>
                <InputText
                    id="patientName"
                    value={patient}
                    placeholder="Nombre del paciente, (Solo lectura)"
                    readOnly
                />

                <label htmlFor="fecha" className="font-bold text-cyan-700">Fecha de la cita:</label>
                <Calendar
                    id="fecha"
                    value={date}
                    onChange={(e) => setDate(e.value ?? null)}
                    disabledDays={[0, 6]}   // Deshabilita domingos y sábados
                    minDate={new Date()}    // No permitir días anteriores a hoy
                    dateFormat="dd/mm/yy"
                    showIcon
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    locale="es"
                    required
                    panelClassName="calendar-small"
                />

                <label className="font-bold text-cyan-700">Hora de la cita:</label>
                <Calendar
                    value={time}
                    onChange={(e) => setTime(e.value ?? null)} 
                    showTime 
                    hourFormat="12"
                    timeOnly  
                    showIcon  
                    icon={() => <i className="pi pi-clock" />}
                    placeholder="Selecciona aquí.."
                    stepMinute={30} 
                    panelClassName="calendar-small"
                    className="w-full"
                    required
                />

                <label className="font-bold text-cyan-700">Profesional:</label>
                <Dropdown
                    value={selectedProfessional}
                    onChange={(e) => setSelectedProfessional(e.value)}
                    options={professionals}
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    required
                    aria-label={'Selecciona al profesional..'}
                />

                <label className="font-bold text-cyan-700">Modalidad:</label>
                <Dropdown
                    value={placeMeeting}
                    onChange={(e) => {
                        setPlaceMeeting(e.value);
                        if (e.value === "Virtual") setSpaceMeeting(e.value="No aplica");
                    }}
                    options={modalidades}
                    optionLabel="name"
                    optionValue="name"
                    placeholder="Selecciona aquí.."
                    className="w-full"
                    required
                />

                {placeMeeting === "Presencial" && (
                    <>
                        <label className="font-bold text-cyan-700">Consultorio:</label>
                        <Dropdown
                            value={spaceMeeting}
                            onChange={(e) => setSpaceMeeting(e.value)}
                            options={consultorios}
                            optionLabel="name"
                            optionValue="name"
                            placeholder="Selecciona aquí.."
                            className="w-full"
                            required={placeMeeting === "Presencial"}
                            aria-label="Selecciona el consultorio"
                        />
                    </>
                )}

                <label htmlFor="motivo" className="font-bold text-cyan-700">Motivo:</label>
                <InputText id="motivo" name="motivo" placeholder="Escribe aquí.." value={reason} onChange={(e) => setReason(e.target.value)} />

                <div className="col-span-2 flex justify-end">
                    <NavButton type="submit" label="Asignar cita" btnFunction={() => console.log('click')} />
                </div>
            </form>
        </Card>
    );
}
