import React from 'react'

const Avatar = ({ src }) => {
    return (
        <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <img src={src} alt='avatar' />
        </div>

    )
}

export default Avatar