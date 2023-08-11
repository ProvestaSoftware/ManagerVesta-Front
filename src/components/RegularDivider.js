import React from 'react'
import '../assets/css/RegularDivider.css'

const RegularDivider = ({ color, size, width }) => {
  return (
    <div className='regular-divider' style={{
      backgroundColor: color,
      height: size,
      width: width
    }}></div>
  )
}

export default RegularDivider