import React, { useState } from 'react'
import Input from '../Inputs/Input'
import RegularDivider from '../RegularDivider'
import RegularButton from '../Buttons/RegularButton'
import { useDispatch } from 'react-redux'
import { updateUserPassword, updateUserProfileData } from '../../actions/userProfile'
import CircularProgress from '../CircularProgress'

const SettingsForm = ({ user }) => {

    const initState = {
        name: user?.name,
        email: user?.email,
    }

    const passInitState = {
        password: '',
        newPassword: '',
        newPassword_confirmation: '',
    }

    const [formData, setFormData] = useState(initState);
    const [passFormData, setPassFormData] = useState(passInitState);
    const [loader, setLoader] = useState(false);
    const [passLoader, setPassLoader] = useState(false);

    const dispatch = useDispatch();

    const handleSubmitData = async (e) => {
        e.preventDefault();
        await setLoader(true);
        // await console.log(formData);
        await dispatch(updateUserProfileData(user?.id, formData));
        await setLoader(false);
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        await setPassLoader(true);
        // await console.log(passFormData);
        await dispatch(updateUserPassword(user?.id, passFormData));
        await setPassLoader(false);
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
            <form onSubmit={handleSubmitPassword} className='password-form-container'>
                <Input
                    label="Mot de passe actuel:"
                    placeholder="Mot de passe actuel"
                    type="text"
                    name="password"
                    onChange={(e) =>
                        setPassFormData({ ...passFormData, password: e.target.value })
                    }
                />
                <Input
                    label="Nouveau mot de passe:"
                    placeholder="Nouveau mot de passe"
                    type="text"
                    name="newPassword"
                    onChange={(e) =>
                        setPassFormData({ ...passFormData, newPassword: e.target.value })
                    }
                />
                <Input
                    label="Confirmer mot de passe:"
                    placeholder="Confirmer mot de passe"
                    type="text"
                    name="newPassword_confirmation"
                    onChange={(e) =>
                        setPassFormData({ ...passFormData, newPassword_confirmation: e.target.value })
                    }
                />
                {passLoader ? (
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
        </div>
    )
}

export default SettingsForm