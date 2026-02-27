type InputType = "letters" | "numbers" | "phone" | "text";

export const UseInputValidation = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    type: InputType
) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    switch (type) {
        case "letters":
            value = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, "");
            break;

        case "numbers":
            value = value.replace(/\D/g, "");
            break;

        case "phone":
            value = value.replace(/\D/g, "");
            if (value.length > 10) value = value.slice(0, 10);
            break;

        case "text":
        default:
            break;
    }

    setter(value);
};