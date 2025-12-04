import { InputText } from "primereact/inputtext";
import NavButton from "../NavButton";
import PatientInfoCard from "../PatientInfoCard";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

export default function UpdateAppointment() {
    return (
        <Card style={{ background: '#f1faee', padding: '0px', margin: 'auto' }} >
            <div className="flex items-center justify-center">
                <InputText placeholder="Número del documento aquí.." keyfilter="alphanum" className="w-1/2"/>
                <Avatar icon="pi pi-search" size="large" style={{background: 'white'}} />
            </div>

            <Divider/>

            <Divider/>
            
            <div className="w-full flex justify-end mt-4">
                <NavButton label="Reprogramar" type={"submit"} btnFunction={() => {}} />
            </div>
        </Card>
    );
}