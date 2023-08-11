import React, { useEffect, useState } from 'react'
import '../../assets/css/SidebarButton.css'
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarButton = ({ item }) => {

    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <a href={item.link} className='sidebar-btn'
            onClick={() => {
                navigate(`/${item.link}`);
                setActive(item.link);
            }}
            style={{
                backgroundColor:
                    active === item.link
                        ? '#6ea8cc'
                        : "transparent",
                color:
                    active === item.link
                        ? '#ffffff'
                        : '#5F6165',
            }}
        >
            {item.icon}
            <span class="ml-3">{item.title}</span>
        </a>
    )
}

export default SidebarButton