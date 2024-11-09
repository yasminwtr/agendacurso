'use client'
import { usePathname, useRouter } from "next/navigation";
import { RiContactsBook2Line } from "react-icons/ri";
import { TbUserSquareRounded } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";

const Sidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className='navbar'>
            <div className='nav-title' onClick={() => router.push('/agenda')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="42" viewBox="0 0 51 42" fill="none">
                    <ellipse cx="8.93662" cy="9.12393" rx="8.93662" ry="9.12393" transform="matrix(0.963889 0.266305 0.49798 -0.867188 0 33.2676)" fill="#19B2FB" />
                    <ellipse cx="6.81496" cy="6.62263" rx="6.81496" ry="6.62263" transform="matrix(0.251514 0.967854 0.999936 0.0113372 7.12891 16.4634)" fill="#FFC300" />
                    <ellipse cx="7.93572" cy="8.10379" rx="7.93572" ry="8.10379" transform="matrix(0.859267 -0.511526 -0.241139 -0.970491 11.9883 41.7812)" fill="#994DFD" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2627 22.1054C19.5164 20.7322 17.0924 20.5874 14.7321 21.9926C12.9919 23.0285 11.5907 24.7257 10.6934 26.6804C12.3435 28.4925 14.6935 29.7038 17.0134 29.7301C20.6707 29.7716 22.8682 26.8521 21.9215 23.2093C21.894 23.1035 21.8642 22.9983 21.8321 22.8937C21.6646 22.6186 21.4745 22.3552 21.2627 22.1054Z" fill="#B1E540" />
                    <g style={{ mixBlendMode: 'multiply' }}>
                        <ellipse cx="5.23582" cy="5.387" rx="5.23582" ry="5.387" transform="matrix(1 0 0.261863 -0.965105 37.707 10.3979)" fill="#B1E540" />
                    </g>
                    <g style={{ mixBlendMode: 'multiply' }}>
                        <path d="M30.8041 10.3649C31.3591 8.31951 30.1391 6.66141 28.0793 6.66141C26.0194 6.66141 23.8997 8.31951 23.3447 10.3649C22.7897 12.4103 24.0097 14.0684 26.0695 14.0684C28.1294 14.0684 30.2491 12.4103 30.8041 10.3649Z" fill="#FB6556" />
                    </g>
                </svg>

                <span>agenda</span>
            </div>

            <div className='links'>
                <div
                    onClick={() => router.push('/agenda')}
                    className={pathname === "/agenda" ? 'link-selected' : ''}
                >
                    <LuCalendarDays size={21} />
                    <span>Agenda</span>
                </div>

                <div
                    onClick={() => router.push('/salas')}
                    className={pathname === "/salas" ? 'link-selected' : ''}
                >
                    <SiGoogleclassroom size={21} />
                    <span>Salas</span>
                </div>

                <div
                    onClick={() => router.push('/turmas')}
                    className={pathname === "/turmas" ? 'link-selected' : ''}
                >
                    <RiContactsBook2Line size={22} />
                    <span>Turmas</span>
                </div>

                <div
                    onClick={() => router.push('/usuarios')}
                    className={pathname === "/usuarios" ? 'link-selected' : ''}
                >
                    <TbUserSquareRounded size={22} />
                    <span>Usuários</span>
                </div>

                <div>
                    <TbLogout2 size={22} />
                    <span>Sair</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
