import React from 'react'
import '../../assets/css/Input.css'

const Input = ({ label, placeholder, type, form, defaultValue, value, defaultChecked, name, onChange, disabled, required = true }) => {
    return (
        <div className="form-group">
            <label for="large-input" class="block mb-2 text-base font-medium text-gray-900 dark:text-white" style={{
                textAlign: 'left',
                color: '#696F79',
                fontSize: form ? '14px' : '18px'
            }}>{label}</label>
            <input style={{
                height: form ? '50px' : '60px',
                flex: 1,
                color: '#696F79',
            }} disabled={disabled} value={value} onChange={onChange} name={name} defaultChecked={defaultChecked} defaultValue={defaultValue} placeholder={placeholder} required={required} type={type} id="large-input" class="block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
    )
}

export default Input