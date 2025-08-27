"use client"
import React from 'react';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 15,  // content için zIndex ekleniyor
        backgroundImage:"url(background.jpg)"
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10,  // overlay için zIndex ekleniyor
    },
};


export default function CustomModal({ marble, isOpen, onRequestClose }) {

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight,setWindowHeight] = useState(0);
     
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        const handleResize2 = () => setWindowHeight(window.innerHeight);
        
        handleResize();
        handleResize2();
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('resize2', handleResize2);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('resize2', handleResize2);
        };
    }, []);
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Image Modal"
            ariaHideApp={false}>
              <div>
            <Carousel className="min-w-[300px] w-[90vw] sm:max-w-[800px] h-full flex items-center justify-center relative">
              <CarouselContent className="h-full">
              {marble.imageList.map((src, index) => (
                <CarouselItem key={index} className="w-full h-full flex items-center justify-center" >
                    <div className='flex flex-col justify-center relative w-[360px] h-[500px] sm:w-[400px] sm:h-[520px] md:w-[500px] md:h-[720px] lg:w-[440px] lg:h-[580px] xl:w-[480px] xl:h-[620px] transition hover:scale-105 cursor-pointer'>
                    <Image
                        src={src.name}
                        fill
                        loading='lazy' 
                        blurDataURL={src.name} 
                        placeholder='blur' 
                        style={{objectFit:"contain"}} 
                        alt='mermer resmi' 
                        quality={100}
                        sizes="(max-width: 640px) 360px, (max-width: 768px) 400px, (max-width: 1024px) 500px, (max-width: 1280px) 440px, 520px"
                    />
                    </div>
                  
                </CarouselItem >
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-20px] bg-fuchsia-200 focus:bg-fuchsia-200" />
              <CarouselNext className="absolute right-[-20px] bg-fuchsia-200 focus:bg-fuchsia-200"/>
            </Carousel>
            </div>

        </Modal>

    );
};

/* 

const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + marble.imageList.length) %  marble.imageList.length);
      };
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) %  marble.imageList.length);
      };

<div id="default-carousel" className="relative w-full">
      
      <div style={
        windowWidth < 700 ? { width: '80vw', height: "60vh" } :
            windowWidth < 1000 ? { width: '65vw', height: "65vh" } :
                windowWidth < 1300 ? { width: '55vw', height: "85vh" } :
                    { width: '42vw', height: "85vh" }}>
{marble.imageList.map((src, index) => (
<div
key={index}
className={`absolute inset-0 duration-700 ease-in-out ${
  currentIndex === index ? "block" : "hidden"
}`}
>
<img
  src={src.name}
  alt={`Slide ${index + 1}`}
  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
/>
</div>
))}
</div>

<div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
{marble.imageList.map((_, index) => (
<button
key={index}
type="button"
className={`w-3 h-3 rounded-full ${
  currentIndex === index ? "bg-gray-800" : "bg-gray-400"
}`}
aria-current={currentIndex === index}
aria-label={`Slide ${index + 1}`}
onClick={() => setCurrentIndex(index)}
/>
))}
</div>

<button
type="button"
className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
onClick={handlePrev}
>
<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
<svg
className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
aria-hidden="true"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 6 10"
>
<path
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  d="M5 1 1 5l4 4"
/>
</svg>
<span className="sr-only">Previous</span>
</span>
</button>
<button
type="button"
className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
onClick={handleNext}
>
<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
<svg
className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
aria-hidden="true"
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 6 10"
>
<path
  stroke="currentColor"
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  d="m1 9 4-4-4-4"
/>
</svg>
<span className="sr-only">Next</span>
</span>
</button>
</div>


*/

/*<div id="product-carousel" className="carousel slide"
                style={
                    windowWidth < 700 ? { width: '80vw', height: "60vh" } :
                        windowWidth < 1000 ? { width: '65vw', height: "65vh" } :
                            windowWidth < 1300 ? { width: '55vw', height: "85vh" } :
                                { width: '42vw', height: "85vh" }}>
                <div className="carousel-indicators" >
                    {marble.imageList.map((imageData,index)=>{
                        if(index ==0){
                            return <button key={`pd-${index}`} type="button" data-bs-target="#product-carousel" data-bs-slide-to={index} className="active" aria-current="true" aria-label="Slide 1"></button>
                        } 
                        else {
                            return <button key={`pd-${index}`} type="button" data-bs-target="#product-carousel" data-bs-slide-to={index} aria-label={`Slide ${index+1}`}></button>
                             
                        }
                    })}
                </div>
                <div className="carousel-inner" style={{ height: "100%", width: "100%" }}>
                    {marble.imageList.map((imageData,index)=>{
                        if(index ==0){
                            return <div key={`pdi-${index}`} className="carousel-item active" style={{ width: "100%", height: "100%" }}>
                                        <img src={imageData.name} alt="Enlarged view" style={{ width: '100%', height: '100%' }} />
                                   </div>
                        } 
                        else {
                            return <div key={`pdi-${index}`} className="carousel-item" style={{ width: "100%", height: "100%" }}>
                                        <img src={imageData.name} alt="Enlarged view" style={{ width: '100%', height: '100%' }} />
                                   </div>
                             
                        }
                    })}
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
            <button onClick={onRequestClose} style={{ position: 'relative' }} className='btn btn-primary w-100 mt-2'>Close</button>*/