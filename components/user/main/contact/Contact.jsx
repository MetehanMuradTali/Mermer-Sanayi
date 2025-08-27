import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'
const Contact = () => {
  return (
    <div id={"Contact"} className='flex flex-col justify-center items-center p-5 rounded  shadow-lg mt-5 w-[90%] sm:w-[50%] min-w-[300px] max-w-[550px] mx-auto'>
                <header className='text-2xl sm:text-3xl font-bold mb-3'>İletişim</header>
                <div>
                    <ul>
                        <div className='text-xl sm:text-2xl font-semibold '>RAMAZAN MERMER SANAYİ</div>
                        <div className='text-xl sm:text-2xl mb-3'>Ramazan Sönmez</div>
                        <div className='flex flex-row mb-3'>
                            <div className='relative min-w-[26px] h-[26px] mr-1'>
                                <Image src={assets.location} fill alt='location'/>
                            </div>
                            <span className='text-base sm:text-base'>Ömer Çolakoğlu Cad. R-Blok:2 ,78600 Karıt/Safranbolu/Karabük</span>
                        </div>
                        <div className='flex flex-row mb-3'>
                            <div className='relative w-[32px] h-[32px] mr-1'>
                                <Image src={assets.telephone} fill alt='phone'/>
                            </div>
                            <span className='text-lg sm:text-xl'>05423189711</span>
                        </div>
                        
                        <div className='flex flex-wrap justify-start gap-6 gap-y-0'>
                            <a className='flex flex-row items-center mb-3' href='https://www.facebook.com/groups/912273898899478?locale=tr_TR' target='_blank'>
                                <div className='relative w-[32px] h-[32px] mr-1'>
                                    <Image src={assets.facebook}  fill alt='facebook' />
                                </div>
                                <span className='text-lg sm:text-xl'>Facebook</span>
                            </a>
                            <a className='flex flex-row items-center mb-3' href='https://www.instagram.com/rmzmermer/' target='_blank'>
                                <div className='relative w-[32px] h-[32px] mr-1'>
                                    <Image src={assets.instagram}  fill alt='facebook' />
                                </div>
                                <span className='text-lg sm:text-xl'>İnstagram</span>
                            </a>
                            <a className='flex flex-row items-center mb-3' href='https://api.whatsapp.com/send/?phone=905423189711&text&type=phone_number&app_absent=0' target='_blank'>
                                <div className='relative w-[32px] h-[32px] mr-1'>
                                    <Image src={assets.whatsapp}  fill alt='whatsapp' />
                                </div>
                                <span className='text-lg sm:text-xl'>Whatsapp</span>
                            </a>
                        </div>
                    </ul>
                </div>
            </div>
  )
}

export default Contact