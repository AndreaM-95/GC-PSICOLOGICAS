import { Button } from "primereact/button";

interface propsButton{
    label: string;
    icon?: string;
    btnFunction: () => void;
}

export default function NavButton({ label, icon, btnFunction }: propsButton) {
    return (
        <Button label={label} icon={icon}  onClick={btnFunction} className="shadow-md" style={{fontSize: '.8rem'}}/>
    );
}
