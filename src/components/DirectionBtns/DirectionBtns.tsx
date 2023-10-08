import React from 'react';
import './DirectionBtns.scss'
//@ts-ignore
import direction from "../../assets/direction.svg"

interface DirectionBtnsProps {
    handleMove: (direction: string) => void;
}

const DirectionBtns: React.FC<DirectionBtnsProps> = ({ handleMove }) => {
    return (
        <>
            <button className='up' onClick={() => handleMove('up')}><img className='icon' src={direction} alt="arrow"/></button>
            <div className="side">
                <button className='side__left' onClick={() => handleMove('left')}><img className='icon' src={direction} alt="arrow"/></button>
                <button className='side__right' onClick={() => handleMove('right')}><img className='icon' src={direction} alt="arrow"/></button>
            </div>
            <button className='down' onClick={() => handleMove('down')}><img className='icon' src={direction} alt="arrow"/></button>
        </>
    );
};

export default DirectionBtns;
