import React from 'react'
import ContentWrapper from '../components/ContentWrapper'

const Accueil = () => {
    const currentYear = new Date().getFullYear();

    return (
        <ContentWrapper>
            <img src={'/logo_cca.png'} className='rounded' alt='logo'/>
            <span className='text-sm absolute bottom-10 right-10'>  
                 Droit d'auteur {currentYear} Tous droits réservés - Propulsé par <a href='https://provestasoft.com'>ProvestaSoft</a>.
            </span>
        </ContentWrapper>
    )
}

export default Accueil