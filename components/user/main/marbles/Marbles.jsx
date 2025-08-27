"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from 'react-modal';
import CustomModal from '../modal/CustomModal';

const Marbles = ({marbles}) => {

    const [marbleList, setMarbleList] = useState({ marbles: {}, status: "initial" });

    const [modalIsOpen, setModalIsOpen] = useState({status:false,marble:null});

    const openModal = (marble) => {
        setModalIsOpen({marble:marble,status:true})
    };

    const closeModal = () => {
        setModalIsOpen({marble:null,status:false})
    };
    

    useEffect(() => {
        setMarbleList({ marbles: groupByType(marbles.marbles), status: "finished" })
        Modal.setAppElement('body');
    }, []);

    const generateImages=()=>{
        return Object.keys(marbleList.marbles).map((type)=>{
            return (
                <div key={type} className='flex items-center flex-col w-[90vw] m-auto my-10 gap-10 shadow-lg p-4 pb-10'>
                    <div id={type} className='text-3xl font-semibold text-black'>{type}</div>
                    <div className='flex flex-wrap gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 justify-center w-[100%]'>
                {
                marbleList.marbles[type].map((marble)=>{
                    var marblePrice = marble.marblePrice;
                    var imageList = marble.imageList;
                    var index = marble.index
                    var displayNumber = marble.displayNumber

                    return  <div key={index} onClick={()=>openModal(marble)}>
                        <div className='flex flex-col justify-center relative w-[380px] h-[460px] sm:w-[400px] sm:h-[480px] md:w-[420px] md:h-[500px] lg:w-[440px] lg:h-[540px] xl:w-[480px] xl:h-[580px] transition hover:scale-105 cursor-pointer'>
                            <Image 
                                src={imageList[0].name} 
                                fill
                                loading='lazy' 
                                blurDataURL={imageList[0].name} 
                                placeholder='blur' 
                                style={{objectFit:"contain"}} 
                                alt='mermer resmi' 
                                quality={100}
                                sizes="(max-width: 640px) 380px, (max-width: 768px) 400px, (max-width: 1024px) 420px, (max-width: 1280px) 440px, 480px"
                            />
                        </div>
                        <div className='text-center mt-2'>
                            <span className='text-black text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-semibold'><span className='text-red-900 font-bold'>{displayNumber}</span> - <span>{marblePrice} TL</span></span>
                        </div>
                    </div>}
                )
            }
            </div>
            {
            modalIsOpen.status && (
                <CustomModal
                    marble={modalIsOpen.marble}
                    isOpen={modalIsOpen.status}
                    onRequestClose={closeModal}
                />
            )
        }
            </div>
        )
        })
    }

  return (<div id={"ürünler"} className='mt-[-50px]'>
            {marbleList.status == "finished" ? generateImages() : ""}        
</div>  )
}

const groupByType = (marbles) => {
    var index=0;
    return marbles.reduce((acc, marble) => {
      const { marbleType } = marble;
      if (!acc[marbleType]) {
        acc[marbleType] = [];
      }
      marble.index=index
      acc[marbleType].push(marble);
      index+=1;
      return acc;
    }, {});
  };

export default Marbles
