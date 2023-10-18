import React from 'react'
import ContentWrapper from '../components/ContentWrapper'

const Accueil = () => {
    const currentYear = new Date().getFullYear();

    return (
        <ContentWrapper>
            <img src={'/logo_cca.png'} className='rounded' alt='logo'/>
            <span className='fixed-bottom-left'>
                Droit d'auteur {currentYear} Tous droits réservés - Powered by <a href='https://provestasoft.com'>ProvestaSoft</a>.
            </span>
            <a href='https://provestasoft.com'>
                <img src={'/Logo_H.svg'} className='logo-bottom-right' alt='logo'/>
            </a>
        </ContentWrapper>
    )
}

export default Accueil