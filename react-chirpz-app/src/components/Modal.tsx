import React from 'react';

import "./Modal.css";

const Modal = ({
    show,
    children,
    onClose,
    title,
    footer
}: any) => {

    if (!show) {
        return null
    }

    return (
        <>
            <div className='overlay'></div>
            <div className="modal modal-container" id="modal">
                <div className='modal-header'>
                    <h3>{title}</h3>
                    <button className="close-icon" onClick={onClose}>
                        <span>X</span>
                    </button>
                </div>
                <div className="content">{children}</div>
                <div className="actions">
                    {footer}
                </div>
            </div>
        </>
    );
};


export default Modal;
