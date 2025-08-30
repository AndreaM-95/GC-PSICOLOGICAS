import { Avatar } from 'primereact/avatar';

interface MenuCardProps {
    icon: string;
    title: string;
    subtitle: string;
    url: string;
}

export default function MenuCard({ icon, title, subtitle, url }: MenuCardProps) {
    return (
        <a
            href={url}
            className="block no-underline"
            style={{ background: '#f1faee', display: 'block', padding: '1rem', borderRadius: '8px' }}
            aria-label={`Ir a ${title}`}
        >
            <div className="flex flex-wrap p-0">
                <Avatar
                    icon={icon}
                    size="large"
                    className="text-white"
                    style={{ backgroundColor: 'var(--primary-color)', marginRight: '1rem' }}
                />
                <h3 className="text-cyan-700 font-bold text-lg content-center w-[70%]">{title}</h3>
                <p className="text-cyan-700 w-full pt-2">{subtitle}</p>
            </div>
        </a>
    )
}