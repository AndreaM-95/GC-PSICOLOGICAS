import { Dropdown } from "primereact/dropdown";

interface InputDropdownProps {
    dataDrops: { id: number; name: string }[];
    textField: string;
    value: string;
    onChange: (value: string) => void;
    id?: string;
}

export default function InputDropdown({ dataDrops, textField, value, onChange, id }: InputDropdownProps) {
    const inputId = id || textField.toLowerCase().replace(/\s+/g, "-");
    return (
        <div className="w-full mt-4 px-4">
            <label htmlFor={inputId} className="block text-cyan-700 mb-2">
                {textField}
            </label>
            <Dropdown
                id={inputId}
                value={value}
                onChange={(e) => onChange(e.value)}
                options={dataDrops}
                optionLabel="name"
                placeholder="Selecciona aquí.."
                className="w-full"
                required
                aria-label={textField}
            />
        </div>
    );
}
