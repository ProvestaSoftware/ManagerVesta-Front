import React, { useState,useEffect } from 'react'
import Input from '../Inputs/Input'
import RegularDivider from '../RegularDivider'
import RegularButton from '../Buttons/RegularButton'
import { useDispatch } from 'react-redux'
import { updateUserPassword, updateUserProfileData } from '../../actions/userProfile'
import CircularProgress from '../CircularProgress'
import { SettingService } from '../../_services/setting.service'
import Skeleton from 'react-loading-skeleton'

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
    SettingService.index()
      .then(res => {
        setSetting(res?.data)
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
    const [passLoader, setPassLoader] = useState(false);
    const [loadersumbit , setLoaderSumbit] = useState(false);

    const dispatch = useDispatch();

    const handleSubmitData = async (e) => {
        e.preventDefault();
        await setLoaderSumbit(true);
        // await console.log(formData);
        await dispatch(updateUserProfileData(user?.id, formData));
        await setLoaderSumbit(false);
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        await setPassLoader(true);
        // await console.log(passFormData);
        await dispatch(updateUserPassword(user?.id, passFormData));
        await setPassLoader(false);
    };


  const handleInputChange = (field, value) => {
    setSetting({
      ...setting,
      [field]: value,
    });
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoaderSumbit(true);
    
        SettingService.store(setting)
          .then(() => {
            setLoaderSumbit(false);
          })
          .catch((error) => {
            console.error('Error updating settings:', error);
            setLoaderSumbit(false);
          });
      };
      const [changePassword, setChangePassword] = useState(false);

      const handlePasswordOptionChange = (e) => {
        setChangePassword(e.target.checked);
      };
    
    return (
        <>
            {loadersumbit ? (
                <div className='fixed-loader-container'>
                <   div className='fixed-loader'></div>
                </div>
            ) : (
            <div className='settings-form'>
                  {loadersettings ? (
                     <Skeleton count={2} />
                 ) : (
                    <form onSubmit={handleSubmitData} className='settings-form-container' style={{ backgroundColor: '#254c75', padding: '20px', borderRadius: '10px' }}>
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
                            <RegularButton
                                styleType="primary"
                                type="submit"
                                position="right"
                            >
                                Enregistrer
                            </RegularButton>
                    </form>
                 )}
                    <RegularDivider size="0.5px" />
                    <div style={{textAlign: 'left'}}>
                        <h3 style={{fontSize: '20px', fontWeight: '600'}}>Paramétres d'entreprise</h3>
                    </div>
                {loadersettings ? (
                     <Skeleton count={5} />
                 ) : (
                    <div style={{ backgroundColor: '#254c75', padding: '20px', borderRadius: '10px' }}>
                        <form onSubmit={handleSubmit} className='settings-form-container'>
                            <Input
                                label="Nom de l'entreprise"
                                placeholder="Nom de l'entreprise"
                                type='text'
                                value={setting.business_name}
                                onChange={(e) => handleInputChange('business_name', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px' }}
                            />
                            <Input
                                label='Nom et lieux de la banque'
                                placeholder='Example : ATB Kélibia'
                                type='text'
                                value={setting.bank_name}
                                onChange={(e) => handleInputChange('bank_name', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px' }}
                            />
                            <br />
                           
                            <Input
                                label='RIB Bank'
                                placeholder='Example (01 061 0141100004218 54)'
                                type='text'
                                value={setting.rib_bank}
                                onChange={(e) => handleInputChange('rib_bank', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px' }}
                            />
                            <button className='custom-button primary' type='submit'>
                                Enregistrer
                            </button>
                        </form>
                    </div>
                )} 
                <RegularDivider size="0.5px" />
                <div style={{textAlign: 'left'}}>
                    <h3 style={{fontSize: '20px', fontWeight: '600'}}>Paramétres d'impression</h3>
                </div>
                {loadersettings ? (
                     <Skeleton count={5} />
                 ) : (
                    <div style={{ backgroundColor: '#254c75', padding: '20px', borderRadius: '10px' }}>
                        <form onSubmit={handleSubmit} className='settings-form-container'>
                            <Input
                                label='Numéro de chèque actuel'
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
                                label='Marge à gauche d`impression des chéques (CM)'
                                placeholder='Marge à gauche des chèques'
                                type='number'
                                value={setting.cheque_margin_left}
                                onChange={(e) => handleInputChange('cheque_margin_left', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px' }}
                            />
                            <Input
                                label='Marge en haut d`impression des chéques (CM)'
                                placeholder='Marge en haut du chèque'
                                type='number'
                                value={setting.cheque_margin_right}
                                onChange={(e) => handleInputChange('cheque_margin_right', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px' }}
                            />
                            <br />
                            <Input
                                label='Marge à gauche des traites (CM)'
                                placeholder='Marge à gauche des traites chèques'
                                type='number'
                                value={setting.cheque_margin_left_trades}
                                onChange={(e) => handleInputChange('cheque_margin_left_trades', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px' }}
                            />
                            <Input
                                label='Marge en haut des traites (CM)'
                                placeholder='Marge en haut des traites chèques'
                                type='number'
                                value={setting.cheque_margin_right_trades}
                                onChange={(e) => handleInputChange('cheque_margin_right_trades', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px'}}
                            />
                            <br />
                            <Input
                                label='Paye de la signature en français'
                                placeholder='Paye de la signature en français'
                                type='text'
                                value={setting.paye_de_signature}
                                onChange={(e) => handleInputChange('paye_de_signature', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px' }}
                            />
                            <Input
                                label='Paye de la signature en arabe'
                                placeholder='Paye de la signature en arabe'
                                type='text'
                                value={setting.paye_de_signature_ar}
                                onChange={(e) => handleInputChange('paye_de_signature_ar', e.target.value)}
                                style={{ width: '100%', marginBottom: '10px',height: '40px', direction: 'rtl' }}
                            />
                            <button className='custom-button primary' type='submit'>
                                Enregistrer
                            </button>
                        </form>
                    </div>
                )} 
                <RegularDivider size="0.5px" />
                <div style={{textAlign: 'left'}}>
                    <h3 style={{fontSize: '20px', fontWeight: '600'}}>Mot de passe du compte</h3>
                </div>
                <div className='settings-password' style={{ backgroundColor: '#254c75', padding: '20px', borderRadius: '10px' }}>

                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type='checkbox'
                                name='passwordOption'
                                checked={changePassword}
                                onChange={handlePasswordOptionChange}
                                style={{ marginRight: '10px', color: '#fffs' }}
                            />
                                  Voulez-vous changer le mot de passe ?
                            </label>
                        </div>
                        {changePassword && (
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
                        )}
                </div>
            </div>
            )}
        </>
    )
}

export default SettingsForm