import { Card } from "primereact/card";
import React from "react";


interface Patient {
    nameUser: string,
    lastNameUser: string,
    documentType: string,
    documentNumber: number,
    birthdate: Date,
    years: number,
    genere: string,
    cityResidence: string,
    address: string,
    celphone: number,
    email: string,
    eps: string,
    nameEmergencyContact: string,
    phoneEmergencyContact: number,
    state: string,
    diagnostic: string
}

export default function InfoUserCard({ patient }: { patient: Patient }) {

    const patientFields = [
        { label: 'Nombres', value: patient.nameUser },
        { label: 'Apellidos', value: patient.lastNameUser },
        { label: 'Tipo de documento', value: patient.documentType },
        { label: 'Número de documento', value: patient.documentNumber },
        { label: 'Fecha de nacimiento', value: patient.birthdate.toLocaleDateString() },
        { label: 'Edad', value: patient.years },
        { label: 'Género', value: patient.genere },
        { label: 'Ciudad de residencia', value: patient.cityResidence },
        { label: 'Dirección', value: patient.address },
        { label: 'Celular', value: patient.celphone },
        { label: 'Email', value: patient.email },
        { label: 'EPS', value: patient.eps },
        { label: 'Contacto de emergencia', value: patient.nameEmergencyContact },
        { label: 'Celular contacto de emergencia', value: patient.phoneEmergencyContact },
        { label: 'Diagnóstico', value: patient.diagnostic },    
    ];

    return (
        <Card
            style={{ background: '#f1faee', padding: '0px', width: '85%', margin:'auto' }}
        >
            <div className="grid gap-1  md:grid-cols-2 lg:grid-cols-6">
                {patientFields.map((field, index) => (
                    <React.Fragment key={index}>
                        <label className="text-cyan-700 w-full font-bold mb-2 text-sm content-center">{field.label}</label>
                        <label className="text-cyan-700 w-full mb-2 text-sm content-center">{field.value.toString()}</label>
                    </React.Fragment>
                ))}
            </div>
        </Card>
    );
}
