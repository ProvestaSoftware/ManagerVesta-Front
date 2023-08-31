import React from 'react'
import logo from '../assets/images/provestaLogo.svg'

const Logo = ({ style }) => {
    return (
        <a href="/" class="flex">
            <img src={'/logo_cca.png'} class="h-10 mr-3" alt="CCA Logo - Provesta" style={style} />
        </a>
    )
}

export default Logo