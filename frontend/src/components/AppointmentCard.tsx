import React from 'react'; 
import { Button } from 'primereact/button';

export default function AppointmentCard() {
    return (
       <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="Primary" />
            <Button label="Secondary" severity="secondary" />
        </div>
    )
}
        