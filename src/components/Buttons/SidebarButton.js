/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import '../../assets/css/SidebarButton.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const SidebarButton = ({ item }) => {

    const dispatch = useDispatch();

    const signout = () => {
        dispatch(logout());
    };

    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (
        <>
            {item.link ? (
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
            ) : (
                <a className='sidebar-btn'
                    onClick={signout}
                    style={{
                        cursor: 'pointer',
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
            )}
        </>
    )
}

export default SidebarButton