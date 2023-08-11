import React from 'react'
import '../assets/css/PageTitle.css'

const PageTitle = ({ children, fontSize, fontWeight }) => {
    return (
        <h1 style={{
            fontSize: fontSize,
            fontWeight: fontWeight
        }} className='page-title'>{children}</h1>
    )
}

export default PageTitle