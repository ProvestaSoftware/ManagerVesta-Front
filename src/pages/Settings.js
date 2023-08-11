import React from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Settings.css'
import SettingsForm from '../components/Forms/SettingsForm'
import { connectedUserData } from '../data/MockData'

const Settings = () => {
    return (
        <ContentWrapper>
            <div className='settings-wrapper'>
                <div>
                    <PageTitle>Paramètres de profil</PageTitle>
                </div>
                <RegularDivider />
                <div className='settings-table-wrapper'>
                    <SettingsForm item={connectedUserData} />
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Settings