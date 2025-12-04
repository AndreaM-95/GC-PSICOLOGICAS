import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import NavButton from "../NavButton";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import AppointmentCard from "../AppointmentCard";
import { Toast } from 'primereact/toast';
import { InputNumber } from "primereact/inputnumber";
import { Divider } from "primereact/divider";


export default function ListAppointments() {
    const toast = useRef<Toast>(null);
    const [patient, setPatient] = useState<string>("");
    const [codAppointment, setCodAppointment] = useState<number>(0);
    const [reason, setReason] = useState<string>("");
    
    
    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto' }} >
            <Toast ref={toast} />
            <section className="flex">
                <div className="w-[75%] flex items-center justify-center">
                    <InputText placeholder="Número del documento aquí.." keyfilter="alphanum" className="w-[85%]"/>
                    <Avatar icon="pi pi-search" size="large" style={{background: 'white'}} />
                </div>

                <div className="w-[25%] flex justify-end">
                    <NavButton label="Buscar citas" type={"submit"} btnFunction={() => {}} />
                </div>
            </section>
            <Divider/>
            
            {/* <section className="w-1/2 mx-auto mt-4 mb-8">
                <AppointmentCard />
            </section> */}
        </Card>
    );
}