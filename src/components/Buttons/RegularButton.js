import React from 'react';
import '../../assets/css/RegularButton.css';

const RegularButton = ({ styleType, onClick, children, type }) => {
    let buttonClass = '';

    switch (styleType) {
        case 'primary':
            buttonClass = 'primary';
            break;
        case 'secondary':
            buttonClass = 'secondary';
            break;
        case 'danger':
            buttonClass = 'danger';
            break;
        case 'print-btn':
            buttonClass = 'print-btn';
            break;
        case 'filter-btn':
            buttonClass = 'filter-btn';
            break;
        case 'save-btn':
            buttonClass = 'save-btn';
            break;
        case 'print-save-btn':
            buttonClass = 'print-save-btn';
            break;
        case 'add-btn':
            buttonClass = 'add-btn';
            break;
        default:
            buttonClass = 'primary';
    }

    return (
        <button type={type} className={`multi-design-button ${buttonClass}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default RegularButton;
