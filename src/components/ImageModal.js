import React from 'react';
import Modal from 'react-modal';
import { useEffect } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
};


export default function ImageModal({ imgSrc, isOpen, onRequestClose }) {


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Image Modal"
            ariaHideApp={false}
        >
            <button onClick={onRequestClose} style={{ float: 'right' }}>Close</button>
            <img src={imgSrc} alt="Enlarged view" style={{ maxWidth: '90vw', maxHeight: '70vh' }} />
        </Modal>
    );
};
