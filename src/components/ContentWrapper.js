import React from 'react'
// import '../assets/css/ContentWrapper.css'

const ContentWrapper = ({ children }) => {
    return (
        <div class="p-4 sm:ml-64" style={{
            backgroundColor: '#F5F5F5',
            height: '100%',
        }}>
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14" style={{
                height: 'auto',
                minHeight: '87vh'
            }}>
                {children}
            </div>
        </div>
    )
}

export default ContentWrapper