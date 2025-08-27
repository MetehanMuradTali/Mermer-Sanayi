"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { assets } from '@/assets/assets';
import { createPortal } from "react-dom";

const Navbar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const navigateToId=(e)=>{
        const id = e.target.value;
        const element = document.getElementById(id);
        console.log("girdi1");
        console.log(`id=> ${id} , element => ${element}`);

        if(element){
        console.log("girdi2");

            element.scrollIntoView({behavior:"smooth",});
        }
    }
    const [isShown,setIsShown] = useState(false);
    return (
        <>
            <div className='lg:flex lg:flex-row lg:justify-around lg:items-center text-black shadow'>
                <div className='flex flex-row  justify-around items-center lg:ms-40 lg:me-12 h-20 relative z-10 '>
                    <div className='md:w-[470px] flex items-center justify-center gap-2 text-2xl lg:text-3xl pl-3 md:p-0'>
                            <div className='relative w-[50px] h-[35px] md:w-[100px] md:h-[50px]'>
                                <Image src={assets.logo} fill alt='logo'></Image>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-2xl md:text-2xl font-bold'>Ramazan Mermer Sanayi</span>
                                <span className='text-base md:text-xl italic'>Karabük'ün En Güvenilir Mermercisi</span>
                            </div>
                    </div>
                    
                </div>
                <div id="default-sidebar" className={`transition duration-500  lg:w-[550px] flex flex-col w-full justify-center gap-4 lg:flex-row justify-center z-5 lg:flex `} aria-label="Sidebar">
                    <aside className={`flex flex-row items-center lg:flex-row justify-center whitespace-nowrap font-medium text-base lg:text-xl gap-1 lg:gap-5 lg:gap-7 mb-5 lg:mb-0`} >
                        <button onMouseEnter={()=>{setIsShown(true)}} onMouseLeave={()=>{setIsShown(false)}} htmlFor='Ürünler' className={`relative p-2 rounded transition ease-in-out duration-500  z-20 `}>
                            ÜRÜNLER
                            {(<div className={`${isShown ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} z-50  transition duration-500 absolute text-left mt-2 p-2 rounded text-fuchsia-50 bg-green-500`}>
                                <option value={"DÜZ MEZAR"} onClick={navigateToId}  className='relative z-10 mb-1'>DÜZ MEZAR</option>
                                <hr className='mb-1'/>
                                <option value={"BABALI MEZAR"} onClick={navigateToId} className='relative z-10 mb-1'>BABALI MEZAR</option>
                                <hr className='mb-1'/>
                                <option value={"ÇİFTLİ MEZAR"} onClick={navigateToId} className='relative z-10 mb-1'>ÇİFTLİ MEZAR</option>
                                <hr className='mb-1'/>
                                <option value={"BEBEK MEZARI"} onClick={navigateToId} className='relative z-10 mb-1'>BEBEK MEZARI</option>
                                <hr className='mb-1'/>
                                <option value={"ÇEŞME"} onClick={navigateToId} className='relative z-10'>ÇEŞME</option>
                            </div>)}
                        </button>
                        
                        <Link href={'#Contact'} className={`p-2 rounded  transition hover:border ease-in-out duration-500 hover:text-fuchsia-50 hover:bg-green-500`}>İLETİŞİM</Link>
                        <Link href={'#Location'} className={`p-2 rounded  transition hover:border ease-in-out duration-500 hover:text-fuchsia-50 hover:bg-green-500`}>KONUM</Link>
                    </aside>
                </div>

            </div>
            <hr className='w-full h-1' />
        </>



    )
}

export default Navbar

// //${isSidebarOpen ? "mobile:max-lg:animate-fadeindown" : "mobile:max-lg:animate-fadeinup"}
/*
<select name='Ürünler' onChange={navigateToId}>
                                <option value={"Düz Mezar"}>Düz Mezar</option>
                                <option value={"Babalı Mezar"}>Babalı Mezar</option>
                                <option value={"Çift Mezar"}>Çift Mezar</option>
                                <option value={"Bebek Mezarı"}>Bebek Mezarı</option>
                                <option value={"Çeşme"}>Çeşme</option>
                            </select>
                            */