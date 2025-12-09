import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';

interface MenuCardProps {
    icon: string;
    title: string;
    description: string;
    url: string;
}

export default function MenuCard(props: MenuCardProps) {
    const navigate = useNavigate();
    return (
        <a
            onClick={() => navigate(props.url)}
            role="button"
            tabIndex={0}
            className="block shadow-gray-300 shadow-xs no-underline transition-transform duration-200  hover:scale-101 hover:shadow-cyan-400 hover:cursor-pointer"
            style={{ background: '#f1faee', display: 'block', padding: '1rem', borderRadius: '8px' }}
            aria-label={`Ir a ${props.title}`}
        >
            <div className="flex flex-wrap p-0 h-32">
                <Avatar
                    icon={props.icon}
                    size="large"
                    className="text-white"
                    style={{ backgroundColor: 'var(--primary-color)', marginRight: '1rem' }}
                />
                <h3 className="text-cyan-700 font-bold text-lg content-center w-[70%]">{props.title}</h3>
                <p className="text-cyan-700 w-full pt-2">{props.description}</p>
            </div>
        </a>
    )
}