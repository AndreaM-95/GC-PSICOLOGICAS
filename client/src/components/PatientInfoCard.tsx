import { Card } from "primereact/card";
import React from "react";

interface PatientInfoSummary {
    nameUser: string,
    lastNameUser: string,
    documentType: string,
    documentNumber: number,
    eps: string,
    state: string,
}

export default function PatientInfoCard({ patient }: { patient: PatientInfoSummary }) {
    const patientFields = [
        { label: 'Nombres', value: patient.nameUser },
        { label: 'Apellidos', value: patient.lastNameUser },
        { label: 'Tipo de documento', value: patient.documentType },
        { label: 'Número de documento', value: patient.documentNumber },
        { label: 'EPS', value: patient.eps },
        { label: 'Estado', value: patient.state },
    ];

  return (
    <Card
        style={{ background: '#f1faee', padding: '0px',  margin:'auto' }}
    >
        <div className="grid gap-1 grid-cols-4">
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
