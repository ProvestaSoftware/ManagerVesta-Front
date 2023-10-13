import React from 'react';
import '../../assets/css/RegularButton.css';

const RegularButton = ({ styleType, onClick, children, type, position, disabled }) => {
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
        case 'print-add-btn':
            buttonClass = 'print-add-btn';
            break;
        case 'add-btn':
            buttonClass = 'add-btn';
            break;
        default:
            buttonClass = 'primary';
    }

    const buttonStyle = {
        marginRight: position === 'right' ? '0!important' : 'auto!important',
        marginLeft: position === 'right' ? 'auto!important' : '0!important',
        opacity: disabled ? '0.5' : '1',  // Set opacity based on the disabled prop
    };

    return (
        <button style={buttonStyle} disabled={disabled} type={type} className={`multi-design-button ${buttonClass}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default RegularButton;
