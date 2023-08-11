import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/RegularLink.css'

const RegularLink = ({ content, link }) => {
    return (
        <Link className='regular-link' to={link}>{content}</Link>
    )
}

export default RegularLink