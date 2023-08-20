import React, { useState } from 'react'
import Input from '../Inputs/Input'
import { useDispatch } from 'react-redux';
import RegularButton from '../Buttons/RegularButton';
import CircularProgress from '../CircularProgress';
import { login } from '../../actions/auth';

const LoginForm = () => {

    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const initState = {
        email: "",
        password: "",
    }

    // const renderError = () => {
    //     if (message) {
    //         return (
    //             <Alert severity="error" style={{
    //                 marginTop: '10px',
    //                 marginBottom: '20px',
    //             }}>
    //                 {message}
    //             </Alert>
    //         )
    //     }
    // }

    const [formData, setFormData] = useState(initState);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setLoader(true);
        await console.log(formData);
        await dispatch(login(formData));
        await setLoader(false);
    };

    return (
        <div class="relative w-full max-h-full">
            <form onSubmit={handleSubmit} class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="p-6 space-y-6">
                    <div class="grid grid-cols-3 gap-6">
                        <div class="col-span-3 sm:col-span-3">
                            <Input
                                label="Email"
                                placeholder="Email"
                                type="text"
                                name="email"
                                form={true}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </div>
                        <div class="col-span-3 sm:col-span-3">
                            <Input
                                label="Mot de passe"
                                placeholder="Mot de passe"
                                type="text"
                                name="password"
                                form={true}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                        </div>
                    </div>
                </div>
                <div class="p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                    {loader ? (
                        <CircularProgress />
                    ) : (
                        <RegularButton
                            styleType="primary"
                            type="submit"
                            position="right"
                        >
                            Se Connecter
                        </RegularButton>
                    )}
                </div>
            </form>
        </div>
    )
}

export default LoginForm