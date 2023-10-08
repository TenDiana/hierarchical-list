import React from 'react';
//@ts-ignore
import Arrow from '../../assets/arrow.svg'
import CustomSelect from "../CustomSelect/CustomSelect";


interface HeaderProps {
    scale: string;
    handleCenter: () => void;
    increaseScale: () => void;
    decreaseScale: () => void;
    toggleDropdown: () => void;
    isOpen: boolean;
    handleItemClick: (item: string) => void;
}
const Header = ({ scale, handleCenter, increaseScale, decreaseScale, toggleDropdown, isOpen, handleItemClick }: HeaderProps) => {
    return (
        <div className='wrapper__header'>
            <div className='wrapper__header-left'>
                <h2 className='wrapper__header-left__title'>Services</h2>
                <span className='wrapper__header-left__count'>0</span>
            </div>
            <div className='wrapper__control'>
                <p className='wrapper__control__list'>List view</p>
                <div className='wrapper__control__buttons'>
                    <button className='wrapper__control__buttons__center' onClick={handleCenter}>
                        <img src={Arrow} alt="arrow" className='wrapper__control__buttons__center-img'/>
                    </button>
                    <button className='wrapper__control__buttons__decrement' onClick={decreaseScale}>-</button>
                    <CustomSelect
                        isOpen={isOpen}
                        handleItemClick={handleItemClick}
                        scale={scale}
                        toggleDropdown={toggleDropdown}
                    />
                    <button className='wrapper__control__buttons__increment' onClick={increaseScale}>+</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
