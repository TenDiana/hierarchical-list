import React from 'react';

interface ModalProps {
    handleAddSubTaskClick: (item: number) => void;
    id: number
    setModalOpen: (modalState: { isOpen: boolean; id: number | null }) => void;
}

const ModalOption = ({ handleAddSubTaskClick, id, setModalOpen }: ModalProps) => {
    return (
        <div className='categories__modal'>
            <p>What do you want to create?</p>
            <div className='categories__modal__btns'>
                <button className='categories__modal__btns-option' onClick={() =>  handleAddSubTaskClick(id)}>CATEGORY</button>
                <button className='categories__modal__btns-option' onClick={() =>  setModalOpen({isOpen: false, id: null})}>SERVICES</button>
            </div>
        </div>
    );
};

export default ModalOption;
