/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const DropdownButton = ({ item }) => {

    const dispatch = useDispatch();
  
    const signout = () => {
      dispatch(logout());
    };

    return (
        <>
            {item.link ? (
                <a href={item.link} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    {item.title}
                </a>
            ) : (
                <a style={{
                    cursor: 'pointer'
                }} onClick={signout} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                    {item.title}
                </a>
            )}
        </>
    )
}

export default DropdownButton