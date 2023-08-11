import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import Logo from '../components/Logo'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'

const Accueil = () => {

    const currentYear = new Date().getFullYear();

    return (
        <ContentWrapper>
            <Logo />
            <RegularDivider />
            <PageTitle fontSize="16px" fontWeight="400">
                Copyright {currentYear} All rights are reserved.
            </PageTitle>
        </ContentWrapper>
    )
}

export default Accueil