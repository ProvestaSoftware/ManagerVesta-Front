import React from 'react'
import '../assets/css/PageTitle.css'

const PageTitle = ({ children, fontSize, fontWeight }) => {
    return (
        <div style={{
            fontSize: fontSize,
            fontWeight: fontWeight,
            height: '100%',
        }} className='page-title'>{children}</div>
    )
}

export default PageTitle