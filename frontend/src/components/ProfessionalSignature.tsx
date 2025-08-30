import { Divider } from "primereact/divider";

interface ProfessionalSignatureProps {
    signature: string;
    name: string;
    specialty: string;
    licenseNumber: string;
    document: string;
}

export default function ProfessionalSignature({ signature,name, specialty, licenseNumber, document }: ProfessionalSignatureProps) {
    return (
        <figure className="w-full flex flex-col text-cyan-700 font-bold text-sm italic">
            <Divider />
            <img
                src={signature}
                alt={`Firma de ${name}`}
                width="150"
                height="150"
                className="signature-image"
            />
            <figcaption className="mt-2">
                <p>{name}</p>
                <p>{specialty}</p>
                <p>T.P {licenseNumber}</p>
                <p>CC {document}</p>
            </figcaption>
        </figure>
    );
}