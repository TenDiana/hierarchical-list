import React from 'react';
// @ts-ignore
import check from "../../assets/check.svg";

interface CustomSelectProps {
    scale: string;
    isOpen: boolean;
    handleItemClick: (item: string) => void;
    toggleDropdown: () => void;
}

const scaleItems: string[] = ['25', '30', '40', '50', '60', '70', '80', '90', '100', '125', '150'];

const CustomSelect = ({ scale, toggleDropdown, isOpen, handleItemClick}: CustomSelectProps) => {
    return (
        <div className='wrapper__control__buttons__select' onClick={toggleDropdown}>
            <div className='wrapper__control__buttons__select-title'>
                {scale}%
            </div>
            {isOpen && (
                <div className='wrapper__control__buttons__select-option'>
                    {scaleItems.map((item) => (
                        <p
                            className='item'
                            key={item}
                            onClick={() => handleItemClick(item)}
                        >
                            {item}% {item === scale && <img className='a' src={check} alt="Check" />}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
