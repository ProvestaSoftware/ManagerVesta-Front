import React from 'react'
import Input from '../Inputs/Input'
import RegularDivider from '../RegularDivider'

const SettingsForm = ({ item }) => {

    return (
        <div className='settings-form'>
            <form className='settings-form-container'>
                <Input
                    label="Nom:"
                    placeholder="Nom"
                    type="text"
                    defaultValue={item.nom}
                />
                <Input
                    label="Prénom:"
                    placeholder="Prénom"
                    type="text"
                    defaultValue={item.prenom}
                />
                <Input
                    label="Email:"
                    placeholder="Email"
                    type="text"
                    defaultValue={item.email}
                />
            </form>
            <RegularDivider size="0.5px" />
            <form className='password-form-container'>
                <Input
                    label="Mot de passe actuel:"
                    placeholder="Mot de passe actuel"
                    type="text"
                    defaultValue={item.password}
                />
                <Input
                    label="Nouveau mot de passe:"
                    placeholder="Nouveau mot de passe"
                    type="text"
                    defaultValue={item.newPassword}
                />
                <Input
                    label="Confirmer mot de passe:"
                    placeholder="Confirmer mot de passe"
                    type="text"
                    defaultValue={item.confirmPassword}
                />
            </form>
        </div>
    )
}

export default SettingsForm