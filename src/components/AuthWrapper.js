import React from 'react'
// import '../assets/css/AuthWrapper.css'

const AuthWrapper = ({ children }) => {
    return (
            <div style={{
                backgroundColor: '#F5F5F5',
                margin: 'calc(100vh - 82vh) auto',
                width: '460px',
                height: 'auto'
                // minHeight: '80vh',
            }}>
                <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700" style={{
                    height: 'auto',
                    // minHeight: "80vh",
                    display: 'block',
                }}>
                    {children}
                </div>
            </div>
    )
}

export default AuthWrapper