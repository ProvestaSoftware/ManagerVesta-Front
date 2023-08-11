import React from 'react'

const DropdownButton = ({ item }) => {
    return (
        <a href={item.link} class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
            {item.title}
        </a>
    )
}

export default DropdownButton