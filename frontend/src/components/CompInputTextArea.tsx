import { InputTextarea } from "primereact/inputtextarea";

interface InputTextAreaProps {
    textField: string;
    value: string;
    onChange: (value: string) => void;
    id?: string;
    rows?: number;      // Opcional, por defecto 3
    cols?: number;      // Opcional, por defecto 30
}

export default function CompInputTextArea({ textField, value, onChange, id, rows = 3, cols = 30 }: InputTextAreaProps) {
    const inputId = id || textField.toLowerCase().replace(/\s+/g, "-");
    return (
        <div className="w-full mt-4 px-4">
            <label htmlFor={inputId} className="block text-cyan-700 mb-2">
                {textField}
            </label>
            <InputTextarea
                id={inputId}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                cols={cols}
                className="w-full"
                placeholder="Escribe aquí..."
                aria-label={textField}
                required
            />
        </div>
    );
}