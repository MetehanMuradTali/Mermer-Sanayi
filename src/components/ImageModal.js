import React from 'react';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 15,  // content için zIndex ekleniyor
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 10,  // overlay için zIndex ekleniyor
    },
};


export default function ImageModal({ imgSrc, isOpen, onRequestClose }) {
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Image Modal"
            ariaHideApp={false}
        >

            <div id="product-carousel" className="carousel slide"
                style={
                    windowWidth < 700 ? { width: '80vw', height: "60vh" } :
                        windowWidth < 1000 ? { width: '65vw', height: "65vh" } :
                            windowWidth < 1300 ? { width: '55vw', height: "85vh" } :
                                { width: '42vw', height: "85vh" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#product-carousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#product-carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#product-carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" style={{ height: "100%", width: "100%" }}>
                    <div className="carousel-item active" style={{ width: "100%", height: "100%" }}>
                        <img src={imgSrc} alt="Enlarged view" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="carousel-item" style={{ width: "100%", height: "100%" }}>
                        <img src={imgSrc} alt="Enlarged view" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="carousel-item" style={{ width: "100%", height: "100%" }} >
                        <img src={imgSrc} alt="Enlarged view" style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#product-carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#product-carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <button onClick={onRequestClose} style={{ position: 'relative' }} className='btn btn-primary w-100 mt-2'>Close</button>

        </Modal>
    );
};
