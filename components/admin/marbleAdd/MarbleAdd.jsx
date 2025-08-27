"use client"
import React,{useState} from 'react'
import InputNumber from 'dw-neit-rc-input-number'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { toast } from "react-toastify";

/*  Mezar Id'si otomatik ekleme yaparken +
    Mezar Fiyati +
    Mezar Türü +
    Mezar Resimleri +
*/
const MarbleAdd = () => {
    const [marbleType,setMarbleType] = useState("DÜZ MEZAR")
    const [marblePrice,setMarblePrice] = useState(20000)
    const [state, setState] = useState({ elementsValues: [] })

    async function createMarble(e) {
        e.preventDefault();
        if (marbleType == "") toast.error("Mermer Türü Seçin!!")
        else if (marblePrice == null || marblePrice<0 ) toast.error("Fiyat 0'dan Küçük veya Boş Olamaz")
        else if(state.elementsValues.length == 0) toast.error("En Az 1 Resim Ekleyin!!")
        else {
            const formData = new FormData();
            formData.append('marblePrice', marblePrice);
            formData.append('marbleType', marbleType);
            formData.append('elementsValues', JSON.stringify(state.elementsValues));
            toast.warn("Mermer Yükleniyor",{autoClose:15000});
            const response = await fetch('/api/admin/createMarble', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                toast.dismiss();
                toast.success("Mermer Başarıyla Eklendi")
            }
            else{
                toast.error("Mermer Yüklenemedi!!")
            }
        }

    }

    const addImageArea = () => {
        const elementId = state.elementsValues.length;
        const newItem = { id: elementId, data: "", buffer: "", imageType: "" }
        setState({ elementsValues: [...state.elementsValues, newItem] })
    }
    const deleteArea = (elementId) => {
        var updatedState = state.elementsValues.filter((elementsValue) => elementsValue.id !== elementId)
        updatedState = updatedState.map((elementsValue, index) => ({
            ...elementsValue,
            id: index,
        }))
        setState({elementsValues: updatedState});    
    }
    function createImage(elementsValue) {
        let src = assets.uploadImage;
        if (elementsValue.buffer != "") {
            const buffer = elementsValue.buffer;
            const blob = new Blob([buffer])
            src = URL.createObjectURL(blob);
            return <Image width={800} height={800} quality={100} style={{objectFit:"contain",width:"90%",height:"80%"}} alt='seçilen_resim'  src={src} onLoad={() => URL.revokeObjectURL(src)} id={elementsValue.id + "-img"} ></Image>
        }
        else {
            return <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
        }

    }
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Base64 formatında veriyi döndür
                resolve(reader.result.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function onImageInputChange(e) {
        const { id, files } = e.target;
        const buffer = await files[0].arrayBuffer()
        const blob = new Blob([buffer])
        const base64 = await fileToBase64(files[0]);
        const newState = state.elementsValues.map(elementsValue => {
            if (elementsValue.id == parseInt(id)) {
                return {
                    ...elementsValue,
                    data: base64,
                    buffer: buffer,
                    imageType: files[0].type
                };
            } else {
                return elementsValue;
            }
        });
        setState({ elementsValues: newState })

    };
    function createElements() {
        return state.elementsValues.map((elementsValue) => {
            return <div key={elementsValue.id} className="relative flex items-center justify-center min-w-[300px] w-[80vw] h-[400px] sm:w-[420px] sm:h-[500px] md:w-[520px] md:h-[650px]">
                    <label htmlFor={elementsValue.id} className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-800 hover:border-gray-500">
                        <span className='text-xl font-medium text-white p-1 mb-2'>Mermer Resmi</span>
                        <button onClick={(e) => { deleteArea(elementsValue.id) }} className='absolute right-[-10px] top-[-10px] z-10 px-2 py-1 border rounded-full border-white bg-red-600 text-white'>Sil</button>
                        <div className="relative w-full h-[90%] flex flex-col items-center justify-center">
                            {createImage(elementsValue)}
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id={elementsValue.id} onChange={async (e) => { onImageInputChange(e) }} type="file" className="hidden" />
                    </label>
                </div>
        })

    }
  return (
    <div className='flex flex-col w-full min-h-screen items-center px-5 py-5 gap-7 bg-slate-400'>
        <h1 className='font-extrabold text-2xl text-slate-100 text-center mb-5'>Mermer Ekleme</h1>
        <div className='relative flex flex-col w-2/5 min-w-[270px]'>
                <label htmlFor="countries" className="w-fit text-sm font-medium text-white bg-gray-700 border p-1.5 rounded-lg border-gray-600 ">Mermer Türü</label>
                <select name='countries' defaultValue={"DÜZ MEZAR"} onChange={(e) => setMarbleType(e.target.value)} className="h-[40px] bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg  focus:border-gray-600 block w-full p-2.5b">
                    <option value="DÜZ MEZAR">DÜZ MEZAR</option>
                    <option value="BABALI MEZAR">BABALI MEZAR</option>
                    <option value="ÇİFTLİ MEZAR">ÇİFTLİ MEZAR</option>
                    <option value="BEBEK MEZARI">BEBEK MEZARI</option>
                    <option value="ÇEŞME">ÇEŞME</option>
                </select>
        </div>
        <div className='relative flex flex-col w-2/5 min-w-[270px]'>
                <label htmlFor="marblePrice" className="w-fit text-sm font-medium text-white bg-gray-700 border p-1.5 rounded-lg border-gray-600 ">Mermer Fiyatı</label>
                <InputNumber
                    name='marblePrice'
                    id='marblePrice'
                    defaultValue={20000}
                    formatter={(value) => `₺ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    onChange={(newValue)=> {
                        if(newValue != null){
                            setMarblePrice(newValue);
                    }}}
                    className='text-black text-xl w-min'
                />        
        </div>
        {createElements()}
        <div className='grid grid-cols-2 md:grid-cols-4  md:max-w-[500px] gap-3 md:gap-5  justify-center items-center '>
                <button onClick={addImageArea} type="button" className="text-white bg-gradient-to-r from-gray-700 via-gray-700 to-gray-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Resim Ekle</button>
        </div>
        <button type="button" onClick={(e) => {createMarble(e)}} className="text-white bg-gradient-to-r from-green-700 via-green-700 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-md shadow-teal-500/50 dark:shadow-md dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Mermeri Ekle</button>
        <button onClick={()=>{
            console.log(marbleType);
        }}>Test</button>
    </div>
  )
}

export default MarbleAdd

// <textarea name="marbleType" id="marbleType" onChange={(e) => setMarbleType(e.target.value)} rows="1" className="block p-2.5 w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 " placeholder="Mermer Türünü Girin"></textarea>