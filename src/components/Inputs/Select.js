import React from 'react'
import '../../assets/css/Select.css'

const Select = ({ title, options, label, form, defaultValue, defaultChecked, name, onChange }) => {
    return (
        <div className='form-group'>
            <label for="large" class="block mb-2 text-base font-medium text-gray-900 dark:text-white" style={{
                textAlign: 'left',
                color: '#696F79',
                fontSize: form ? '14px' : '18px'
            }}>{label}</label>
            <select onChange={onChange} name={name} style={{
                height: form ? '50px' : '60px',
                color: '#696F79'
            }} id="large" class="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option defaultValue={defaultValue} defaultChecked={defaultChecked} selected>{title}</option>
                {options.map((item, index) => (
                    <option key={index} value={item.nom}>{item.nom}</option>
                ))}
            </select>
        </div>
    )
}

export default Select