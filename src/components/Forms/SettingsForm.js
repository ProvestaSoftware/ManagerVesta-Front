import React, { useState } from 'react'
import Input from '../Inputs/Input'
import RegularDivider from '../RegularDivider'
import RegularButton from '../Buttons/RegularButton'
import { useDispatch } from 'react-redux'
import { updateUserProfileData } from '../../actions/userProfile'
import CircularProgress from '../CircularProgress'

const SettingsForm = ({ user }) => {

    const initState = {
        name: user?.name,
        email: user?.email,
    }

    const [formData, setFormData] = useState(initState);
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();

    const handleSubmitData = async (e) => {
        e.preventDefault();
        await setLoader(true);
        // await console.log(formData);
        await dispatch(updateUserProfileData(user?.id, formData));
        await setLoader(false);
    };

    return (
        <div className='settings-form'>
            <form onSubmit={handleSubmitData} className='settings-form-container'>
                <Input
                    label="Nom:"
                    placeholder="Nom"
                    type="text"
                    defaultValue={user?.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />
                <Input
                    label="Email:"
                    placeholder="Email"
                    type="text"
                    defaultValue={user?.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
                {loader ? (
                    <CircularProgress />
                ) : (
                    <RegularButton
                        styleType="primary"
                        type="submit"
                        position="right"
                    >
                        Enregistrer
                    </RegularButton>
                )}
            </form>
            <RegularDivider size="0.5px" />
            <form className='password-form-container'>
                <Input
                    label="Mot de passe actuel:"
                    placeholder="Mot de passe actuel"
                    type="text"
                    defaultValue={user?.password}
                />
                <Input
                    label="Nouveau mot de passe:"
                    placeholder="Nouveau mot de passe"
                    type="text"
                    defaultValue={user?.newPassword}
                />
                <Input
                    label="Confirmer mot de passe:"
                    placeholder="Confirmer mot de passe"
                    type="text"
                    defaultValue={user?.confirmPassword}
                />
            </form>
        </div>
    )
}

export default SettingsForm