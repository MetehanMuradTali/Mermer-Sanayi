"use client"
import React,{useState,useEffect} from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'

const Footer = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(false);

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

  return (
    <div id={"footer"} className={`sticky bottom-0  flex items-center justify-center w-full h-[100px] transition-all duration-1000  ${!show ? "translate-y-full" : ""}`} >
      <Image src={assets.navbg} alt="footerbg" style={{width:"100vw",height:"100%",objectFit:"cover"}} className='absolute'/>
      <Image src={assets.footerv2} fill alt="Footer" className='absolute z-10 my-auto p-2' />
    </div>
  )
}

export default Footer