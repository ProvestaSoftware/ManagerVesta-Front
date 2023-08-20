import React from 'react'
import logo from '../assets/images/provestaLogo.svg'

const Logo = ({ style }) => {
    return (
        <a href="/" class="flex">
            <img src={logo} class="h-8 mr-3" alt="Provesta Logo" style={style} />
        </a>
    )
}

export default Logo