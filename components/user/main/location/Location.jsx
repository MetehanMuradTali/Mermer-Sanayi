import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Location = () => {
  return (
    <div id={"Location"}>
        <div className='flex flex-col justify-center items-center rounded shadow-lg mx-auto pt-3 mt-5 w-[90%] sm:w-[60%] min-w-[300px]  h-[45vh] sm:h-[50vh]'>
                <header className='flex flex-row items-center mb-3'>
                    <div className='relative min-w-[26px] h-[26px] mr-1'>
                        <Image src={assets.location} fill alt='location'/>
                    </div>
                    <span className='text-3xl font-bold'>Harita Üzerinde Yerimiz</span>
                </header>
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d861.8569586704125!2d32.708888108642185!3d41.21828857068688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDEzJzA1LjkiTiAzMsKwNDInMzYuMyJF!5e0!3m2!1str!2str!4v1704210781345!5m2!1str!2str" width="90%" height="80%" allowFullScreen={true} referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        <div style={{ marginBottom: "120px" }}></div>
    </div>
  )
}

export default Location