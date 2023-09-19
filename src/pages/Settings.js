import React, { useEffect, useState } from 'react'
import ContentWrapper from '../components/ContentWrapper'
import RegularDivider from '../components/RegularDivider'
import PageTitle from '../components/PageTitle'
import '../assets/css/Settings.css'
import SettingsForm from '../components/Forms/SettingsForm'
import { Setting } from '../_services/setting.service'

const Settings = () => {

    const userProfile = useState(JSON.parse(localStorage.getItem("profile")));
    const user = userProfile[0]?.data?.user;


    return (
        <ContentWrapper>
            <div className='settings-wrapper'>
                <div>
                    <PageTitle>Paramètres de profil</PageTitle>
                </div>
                <RegularDivider />
                <div className='settings-table-wrapper'>
                    <SettingsForm user={user}  />
                </div>
            </div>
        </ContentWrapper>
    )
}

export default Settings