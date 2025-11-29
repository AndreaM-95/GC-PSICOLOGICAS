import { Button } from "primereact/button";

interface propsButton{
    label: string;
    icon?: string;
    type: "button" | "submit" | "reset";
    btnFunction: () => void;
}

export default function NavButton({ label, icon, type, btnFunction }: propsButton) {
    return (
        <Button label={label} icon={icon} type={type} onClick={btnFunction} className="shadow-md" style={{fontSize: '.8rem'}}/>
    );
}
