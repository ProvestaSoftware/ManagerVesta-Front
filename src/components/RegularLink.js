import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/RegularLink.css'

const RegularLink = ({ content, link, onClick }) => {
    return (
        <Link onClick={onClick} className='regular-link' to={link}>{content}</Link>
    )
}

export default RegularLink