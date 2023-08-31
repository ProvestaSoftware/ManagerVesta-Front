import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import Logo from '../components/Logo'

const Accueil = () => {
    const currentYear = new Date().getFullYear();

    return (
        <ContentWrapper>
            <img src={'/logo_cca.png'} className='rounded' />
            <span className='text-sm absolute bottom-10 right-10'>
                Copyright {currentYear} All rights are reserved - Powered by <a href='https://provestasoft.com'>ProvestaSoft</a>.
            </span>
        </ContentWrapper>
    )
}

export default Accueil