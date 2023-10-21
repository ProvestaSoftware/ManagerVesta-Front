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
            <div className='log_responsive'>
                <a href='https://provestasoft.com'>
                    <img src={'/Logo_H.svg'} alt='logo' style={{ width: '100%', maxWidth: '100px', height: 'auto' }} />
                </a>
            </div>
        </ContentWrapper>
    )
}

export default Accueil