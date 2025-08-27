import { assets } from '@/assets/assets'
import React from 'react'
import Image from 'next/image'

const Store = () => {
  return (
    <div id={"store"} className='z-0' >
      <div className='relative w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-[620px]'>
          <Image src={assets.dukkan} fill quality={100} alt='dukkan' />
      </div>
      <div className='text-black mt-[30px]'>
        <div className='flex flex-row items-center justify-center text-center w-full text-base md:text-xl'>
          <div className='relative min-w-[40px] min-h-[40px]'><Image src={assets.location} fill alt='location'/></div> 
          <span className="w-[270px] sm:w-fit">Ömer Çolakoğlu Cad. R-Blok:2, 78600 Karıt/Safranbolu/Karabük</span>
        </div>
      </div>
      <div className='relative w-full h-[100px] sm:h-[200px] md:h-[200px] lg:h-[200px] mx-auto flex items-center '>
      <Image src={assets.types} fill quality={100} alt='dukkan' />
      </div>
    </div>
  )
}

export default Store