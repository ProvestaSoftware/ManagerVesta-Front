import React from 'react'
import Logo from '../components/Logo'
import RegularDivider from '../components/RegularDivider'
import AuthWrapper from '../components/AuthWrapper'
import LoginForm from '../components/Forms/LoginForm'
import '../assets/css/Login.css'

const Login = () => {

    return (
        <AuthWrapper>
            <div className='logo-container'>
                <Logo style={{
                    margin: 'auto',
                    width: '100%',
                    height: '36px'
                }} />
            </div>
            <RegularDivider />
            <LoginForm />
        </AuthWrapper>
    )
}

export default Login