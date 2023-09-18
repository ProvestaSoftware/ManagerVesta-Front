import React, { useState,useEffect } from 'react'
import Input from '../Inputs/Input'
import RegularDivider from '../RegularDivider'
import RegularButton from '../Buttons/RegularButton'
import { useDispatch } from 'react-redux'
import { updateUserPassword, updateUserProfileData } from '../../actions/userProfile'
import CircularProgress from '../CircularProgress'
import { Setting } from '../../_services/setting.service'

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

    const [setting, setSetting] = useState([]);
const [loadersettings,setLoaderSettings] = useState(false)

  const getData = () => {
    setLoaderSettings(true)
    Setting.index()
      .then(res => {
        setSetting(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoaderSettings(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted with data:', formData);
  };

  const handleInputChange = (field, value) => {
    setSetting({
      ...setting,
      [field]: value,
    });
  };
console.log('setting',setting)
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
            <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
    <form onSubmit={handleSubmit} className='settings-form-container'>
        <Input
            label='Numéro de chèque actuel :'
            placeholder='Numéro de chèque actuel'
            type='text'
            value={setting.current_cheque_number}
            onChange={(e) => handleInputChange('current_cheque_number', e.target.value)}
            style={{ width: '100%', marginBottom: '10px',height: '40px' }}
        />
    </form>
    <RegularDivider size="0.5px" />
    <form onSubmit={handleSubmit} className='settings-form-container'>
        <Input
            label='Marge à gauche :'
            placeholder='Marge à gauche du chèque'
            type='number'
            value={setting.cheque_margin_left}
            onChange={(e) => handleInputChange('cheque_margin_left', e.target.value)}
            style={{ width: '100%', marginBottom: '10px',height: '40px' }}
        />
        <Input
            label='Marge à droite :'
            placeholder='Marge à droite du chèque'
            type='number'
            value={setting.cheque_margin_right}
            onChange={(e) => handleInputChange('cheque_margin_right', e.target.value)}
            style={{ width: '100%', marginBottom: '10px',height: '40px' }}
        />
        <Input
            label='Marge à gauche des opérations :'
            placeholder='Marge à gauche des opérations chèques'
            type='number'
            value={setting.cheque_margin_left_trades}
            onChange={(e) => handleInputChange('cheque_margin_left_trades', e.target.value)}
            style={{ width: '100%', marginBottom: '10px',height: '40px' }}
        />
        <Input
            label='Marge à droite des opérations :'
            placeholder='Marge à droite des opérations chèques'
            type='number'
            value={setting.cheque_margin_right_trades}
            onChange={(e) => handleInputChange('cheque_margin_right_trades', e.target.value)}
            style={{ width: '100%', marginBottom: '10px',height: '40px'}}
        />
        <Input
            label='Paye de la signature :'
            placeholder='Paye de la signature'
            type='text'
            value={setting.paye_de_signature}
            onChange={(e) => handleInputChange('paye_de_signature', e.target.value)}
            style={{ width: '100%', marginBottom: '10px',height: '40px' }}
        />
        {loader ? (
            <CircularProgress style={{ margin: '10px 0' }} />
        ) : (
            <button className='custom-button primary' type='submit'>
                Enregistrer
            </button>
        )}
    </form>
</div>


            <RegularDivider size="0.5px" />
            <form onSubmit={handleSubmitPassword} className='password-form-container'>
                <Input
                    label="Mot de passe actuel:"
                    placeholder="Mot de passe actuel"
                    type="password"
                    name="password"
                    onChange={(e) =>
                        setPassFormData({ ...passFormData, password: e.target.value })
                    }
                />
                <Input
                    label="Nouveau mot de passe:"
                    placeholder="Nouveau mot de passe"
                    type="password"
                    name="newPassword"
                    onChange={(e) =>
                        setPassFormData({ ...passFormData, newPassword: e.target.value })
                    }
                />
                <Input
                    label="Confirmer mot de passe:"
                    placeholder="Confirmer mot de passe"
                    type="password"
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