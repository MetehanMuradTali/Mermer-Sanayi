"use client"
import Image from 'next/image'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

export default function Home() {

    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

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

    return (
        <main style={{ position: 'absolute' }} className='gx-0'>

            {/*Navbar*/}
            <nav className={`navbar navbar-expand-xl navbar-dark ${styles['nav-active']} ${show && styles['nav-hidden']}`}>
                <div className={`container-fluid ${styles['nav-width']}`}>
                    <Image
                        src="/images/logo.png"
                        width={100}
                        height={50}
                        alt="Logo"
                        className='ms-5 me-1'
                    />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-2 mb-2 mb-xl-0">
                            <li className="nav-item active">
                                <span className='text-white' style={{ fontSize: '24px', fontWeight: 'bold', display: 'block', width: '100%' }}>Ramazan Mermer Sanayi</span>
                                <span className='text-white' style={{ fontSize: '15px', fontStyle: 'italic', display: 'block', width: '100%' }}>Karabük'ün En Güvenilir Mermercisi</span>
                            </li>
                        </ul>
                        <div className="d-flex flex-column flex-xl-row my-2 mx-4 w-100">
                            <form className='container-fluid d-flex mb-2 mb-xl-0'>
                                <input className={`form-control mx-1 ${styles['nav-input']}`} type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-light" type="submit">Search</button>
                            </form>
                            <ul className="navbar-nav mx-2 flex-column flex-xl-row">
                                <li className="nav-item active d-flex flex-column flex-xl-row">
                                    <span className='text-white me-xl-3 mb-2 mb-xl-0'>Anasayfa</span>
                                    <span className='text-white me-xl-3 mb-2 mb-xl-0'>Mezar Fiyat ve Modelleri</span>
                                    <span className='text-white mb-2 mb-xl-0'>İletişim</span>
                                </li>
                            </ul>
                        </div>
                        <div className='d-flex flex-column flex-xl-row'>
                            <a className='me-3 text-white mb-2 mb-xl-0' style={{ textDecoration: "none" }} href=''>
                                <span>Facebook</span>
                                <img src="/icons/facebook.svg" width="32" height="32" alt='facebook' />
                            </a>
                            <a className='me-3 text-white mb-2 mb-xl-0' style={{ textDecoration: "none" }} href=''>
                                <span>İnstagram</span>
                                <img src="/icons/instagram.svg" width="32" height="32" alt='instagram' />
                            </a>
                            <a className='me-3 text-white' style={{ textDecoration: "none" }} href=''>
                                <span>Whatsapp</span>
                                <img src="/icons/whatsapp.svg" width="32" height="32" alt='whatsapp' />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/*Giriş*/}
            <div className='d-flex flex-column bg-primary  align-items-center' style={{ paddingTop: "65px", width: "100%", height: "60%" }}>
                <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", justifyContent: "center", paddingRight: "1%" }}>
                    <Image
                        src="/images/kapak.png"
                        alt="kapak"
                        quality={100}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                        width={500}
                        height={300}
                    />
                </div>

                <div className='my-sm-3'>
                    <Image src="/icons/location.svg" className={styles["responsive-img"]} color='#000000' width={32} height={32} alt='location' />
                    <span className={`text-white ${styles['responsive-text']}`} > Ömer Çolakoğlu Cad. R-Blok:2, 78600 Karıt/Safranbolu/Karabük</span>
                </div>
                <div style={{ width: "70%", height: "20%" }}>
                    <Image
                        src="/images/kapak_urunler.png"
                        layout='responsive'
                        width={100}
                        height={100}
                        alt="kapak_urunler"
                    />
                </div>
            </div>

            {/*Ürünler*/}
            <header className='text-danger' style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold", marginTop: "30px" }}><span >Mezar Taşları</span></header>
            <div className={`${styles['card-container']}`}>
                {data.map((item, index) => (
                    <div className={`card figure p-2 shadow ${styles['hover-card']}`} style={{ width: "20vw", minWidth: '150px', maxWidth: '300px' }} key={`card-image-${index}`}>
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
                            <a href="" className={`btn btn-primary ps-1  ${styles['card-price-text']} `} style={{ borderRadius: "30px" }}><span className={`text-white bg-danger rounded-circle py-1 px-3 me-1`}>{item.mezar_num}</span>{item.mezar_price}TL</a>
                        </div>
                    </div>

                ))}
            </div>

            {/*İletişim*/}
            <div className='d-flex flex-column container-fluid justify-content-center align-items-center gap-3 rounded  shadow mt-2' style={{ width: "50%", minWidth: "375px" }}>
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
                                <a className='me-3 text-primary' style={{ textDecoration: "none", color: "blue" }} href=''>
                                    <img src="/icons/facebook.svg" color='' width="32" height="32" alt='facebook' />
                                    <span>Facebook</span>
                                </a>
                                <a className='me-3 text-warning' style={{ textDecoration: "none" }} href=''>
                                    <img src="/icons/instagram.svg" width="32" height="32" alt='facebook' />
                                    <span>İnstagram</span>
                                </a>
                                <a className='me-3 text-success' style={{ textDecoration: "none" }} href=''>
                                    <img src="/icons/whatsapp.svg" width="32" height="32" alt='facebook' />
                                    <span>Whatsapp</span>
                                </a>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>

            {/*Google Map*/}
            <div className='d-flex flex-column container-fluid  align-items-center gap-3 rounded  shadow mt-5 mx-1 pt-3' style={{ width: "90%", height: "40vh" }}>
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
                    src="/images/alt_bilgi.png"
                    fill
                    alt="Footer"

                />
            </footer>
        </main >
    )
}