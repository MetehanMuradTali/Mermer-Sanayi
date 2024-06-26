"use client"
import Image from 'next/image'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import ImageModal from '@/components/ImageModal';
import Modal from 'react-modal';

export default function Home() {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);

    const openModal = (imageSrc) => {
        setCurrentImage(imageSrc);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setCurrentImage(null);
        setModalIsOpen(false);
    };

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
            setShow(true);
        } else { // if scroll up show the navbar
            setShow(false);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        // cleanup function
        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY]);


    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const load = () => {
        fetch('/csv/mezarlar.csv')
            .then(response => response.text())
            .then(responseText => {
                Papa.parse(responseText, {
                    header: true, // CSV dosyasının ilk satırını başlık olarak kullan
                    complete: (results) => {
                        setData(results.data); // Ayrıştırılmış CSV verisini state'e kaydet
                    },
                    error: (error) => {
                        console.error('Error parsing CSV file:', error);
                    }
                });
            })
            .catch(error => console.error('Error fetching the CSV file:', error));
    };
    useEffect(() => {
        load();
    }, []); // Boş bağımlılık dizisi ile sadece bir kez çalıştırılır

    useEffect(() => {
        Modal.setAppElement('body');
    }, []);
    /*<Image
                    src="/images/dukkan.jpg"
                    alt="kapak"
                    sizes="50%"
                    style={{
                        width: '100%',
                        height: "auto"
                    }}
                    width={500}
                    height={300}
                    quality={100}
                    className="d-block w-100"
                />*/
    return (
        <main className={`gx-0 ${styles["main"]}`} style={{ position: 'absolute' }}>

            <nav className={` ${styles['nav-active']} ${show && styles['nav-hidden']}`}>
                <div className={`${styles["nav-header"]} `}>
                    <Image
                        src="/images/logo.png"
                        width={windowWidth < 700 ? 50 : 100}
                        height={windowWidth < 700 ? 27 : 54}
                        alt="Logo"
                    />

                    <div className={`${styles["nav-header-name"]}`}>
                        <span className={`${styles["nav-header-header"]}`}>Ramazan Mermer Sanayi</span>
                        <span className={`${styles["nav-header-subheader"]}`}>Karabük'ün En Güvenilir Mermercisi</span>
                    </div>

                    <button
                        type="button"
                        className={`btn btn-sm btn-primary ${styles["collapse"]} `}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Menü
                    </button>

                </div>
                <div style={
                    isOpen && windowWidth < 1200 ? { display: "block" } :
                        !isOpen && windowWidth >= 1200 ? { display: "block" } :
                            !isOpen && windowWidth < 1200 ? { display: "none" } :
                                { display: "block" }} >
                    <form className='container-fluid d-flex mb-2 mb-xl-0'>
                        <input className={`form-control mx-1 ${styles['nav-input']}`} type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-light" type="submit">Search</button>
                    </form>
                    <div className={`${styles["nav-middle"]}`}>
                        <span>Anasayfa</span>
                        <span>Mezar Fiyat ve Modelleri</span>
                        <span>İletişim</span>
                    </div>
                </div>
                <div className={`${styles["nav-last"]}`}
                    style={
                        isOpen && windowWidth < 1200 ? { display: "flex" } :
                            !isOpen && windowWidth >= 1200 ? { display: "flex" } :
                                !isOpen && windowWidth < 1200 ? { display: "none" } :
                                    { display: "flex" }} >
                    <a className={`${styles["nav-last-link"]}`} href='https://www.facebook.com/groups/912273898899478?locale=tr_TR' target='_blank'>
                        <span style={{ color: 'blue' }}>Facebook</span>
                        <img src="/icons/facebook.svg" width="32" height="32" alt='facebook' />
                    </a>
                    <a className={`${styles["nav-last-link"]}`} href='https://www.instagram.com/rmzmermer/' target='_blank'>
                        <span style={{ color: 'orange' }}>İnstagram</span>
                        <img src="/icons/instagram.svg" width="32" height="32" alt='instagram' />
                    </a>
                    <a className={`${styles["nav-last-link"]}`} href='https://api.whatsapp.com/send/?phone=905423189711&text&type=phone_number&app_absent=0' target='_blank'>
                        <span style={{ color: 'green' }}>Whatsapp</span>
                        <img src="/icons/whatsapp.svg" width="32" height="32" alt='whatsapp' />
                    </a>

                </div>
            </nav>

            {/*Giriş*/}
            <div className='d-flex flex-column align-items-center' data-bs-ride="carousel" style={{ width: "100%", height: "100%" }} >
                <div id="carouselExampleIndicators" className="carousel slide w-100 mt-5" style={windowWidth < 600 ? { height: "40vh" } : { height: "70vh" }}>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner" style={{ height: "100%" }}>
                        <div className="carousel-item active" style={{ width: "100%", height: "100%" }}>
                            <Image
                                src="/images/dukkan.jpg"
                                alt="kapak"
                                sizes="100%"
                                style={{
                                    width: '100%',
                                    height: "100%"
                                }}
                                width={500}
                                height={300}
                                quality={100}
                            />
                        </div>
                        <div className="carousel-item" style={{ width: "100%", height: "100%" }}>
                            <Image
                                src="/images/dukkan.jpg"
                                alt="kapak"
                                sizes="100%"
                                style={{
                                    width: '100%',
                                    height: "100%"
                                }}
                                width={500}
                                height={300}
                                quality={100}
                            />
                        </div>
                        <div className="carousel-item" style={{ width: "100%", height: "100%" }} >
                            <Image
                                src="/images/dukkan.jpg"
                                alt="kapak"
                                sizes="100%"
                                style={{
                                    width: '100%',
                                    height: "100%"
                                }}
                                width={500}
                                height={300}
                                quality={100}
                            />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className='my-1' style={{ textAlign: 'center' }}>
                    <Image src="/icons/location.svg" className={styles["responsive-img"]} width={32} height={32} alt='location' />
                    <span className={`${styles['responsive-text']}`} > Ömer Çolakoğlu Cad. R-Blok:2, 78600 Karıt/Safranbolu/Karabük</span>
                </div>
                <div style={{ width: "90%", height: "30%" }}>
                    <Image
                        src="/svg/turler.svg"
                        layout='responsive'
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        width={100}
                        height={100}
                        alt="kapak_urunler"
                    />
                </div>
            </div>

            {/*Ürünler*/}
            <header className='text-danger' style={{ textAlign: "center", fontSize: "24px", fontWeight: "bolder", marginTop: "30px" }}><span >Mezar Taşları</span></header>
            <div className={`${styles['card-container']}`} style={windowWidth < 1200 ? { gap: "15px" } : { gap: "30px" }}>
                {data.map((item, index) => (
                    <div className={`card p-2 shadow ${styles['hover-card']}`} style={{ width: "20vw", minWidth: '150px', maxWidth: '300px' }} key={`card-image-${index}`}
                        onClick={() => openModal(`/images/mezarlar/${index + 1}.jpg`)}
                    >
                        <Image
                            src={`/images/mezarlar/${index + 1}.jpg`}
                            style={{ width: '90%', height: '70%' }}
                            width={300}
                            height={300}
                            alt={`card-image-${index}`}
                            quality={100}
                        />
                        <div className="card-body">
                            <h5 className={`card-title ${styles['card-text']}`}>{item.mezar_name}</h5>
                            <a href="" className={`btn ps-1  ${styles['card-price-text']} `} style={{ borderRadius: "30px" }}><span className={`bg-white rounded-circle py-1 px-3 me-1`}>{item.mezar_num}</span>{item.mezar_price}TL</a>
                        </div>
                    </div>
                ))}
            </div>
            {
                currentImage && (
                    <ImageModal
                        imgSrc={currentImage}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                    />
                )
            }
            {/*İletişim*/}
            <div className='d-flex flex-column container-fluid justify-content-center align-items-center gap-3 rounded  shadow mt-5' style={{ width: "50%", minWidth: "350px" }}>
                <header className='row' style={{ fontSize: "24px", fontWeight: 'bold' }}>İletişim</header>
                <div className='row'>
                    <ul>
                        <div style={{ fontSize: "18px", fontWeight: 'bolder' }}>RAMAZAN MERMER SANAYİ</div>
                        <div>Ramazan Sönmez</div>
                        <div>

                            <span>Ömer Çolakoğlu Cad. R-Blok:2 ,78600
                                Karıt/Safranbolu/Karabük</span>
                        </div>
                        <div>
                            <img src="/icons/telephone.svg" color='' width="32" height="32" alt='facebook' />
                            <span>05423189711</span>
                        </div>
                        <div>
                            <div className='d-flex flex-row'>
                                <a className='me-3 text-primary' style={{ textDecoration: "none", color: "blue" }} href='https://www.facebook.com/groups/912273898899478?locale=tr_TR' target='_blank'>
                                    <img src="/icons/facebook.svg" color='' width="32" height="32" alt='facebook' />
                                    <span>Facebook</span>
                                </a>
                                <a className='me-3 text-warning' style={{ textDecoration: "none" }} href='https://www.instagram.com/rmzmermer/' target='_blank'>
                                    <img src="/icons/instagram.svg" width="32" height="32" alt='instagram' />
                                    <span>İnstagram</span>
                                </a>
                                <a className='me-3 text-success' style={{ textDecoration: "none" }} href='https://api.whatsapp.com/send/?phone=905423189711&text&type=phone_number&app_absent=0' target='_blank'>
                                    <img src="/icons/whatsapp.svg" width="32" height="32" alt='whatsapp' />
                                    <span>Whatsapp</span>
                                </a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>

            {/*Google Map*/}
            <div className='d-flex flex-column container-fluid  justify-content-center align-items-center gap-3 rounded  shadow mt-5 pt-3' style={{ width: "80%", height: "40vh" }}>
                <header className='d-flex flex-col align-items-center'>
                    <img src="/icons/location_dark.svg" color='' width="32" height="32" alt='facebook' />
                    <span style={{ fontSize: "24px", fontWeight: 'bold' }}>Harita Üzerinde Yerimiz</span>
                </header>
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d861.8569586704125!2d32.708888108642185!3d41.21828857068688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDEzJzA1LjkiTiAzMsKwNDInMzYuMyJF!5e0!3m2!1str!2str!4v1704210781345!5m2!1str!2str" width="90%" height="80%" allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div style={{ marginBottom: "120px" }}></div>

            {/*Footer*/}
            <footer className={`navbar ${styles['footer-active']} ${!show && styles['footer-hidden']} `}>
                <Image
                    src="/svg/footer2.svg"
                    fill
                    alt="Footer"
                />
            </footer>
        </main >

    )
}