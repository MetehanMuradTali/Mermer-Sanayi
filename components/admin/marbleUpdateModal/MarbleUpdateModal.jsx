"use client"
import React from 'react';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import InputNumber from 'dw-neit-rc-input-number'
import { assets } from '@/assets/assets'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 41,
    },
};



export default function MarbleUpdateModal({ marble, isOpen, onRequestClose }) {

    const [marbleType,setMarbleType] = useState("")
    const [marblePrice,setMarblePrice] = useState(20000)
    const [state, setState] = useState({ elementsValues: [] })
    

    useEffect(() => {
        setMarbleType(marble.marbleType)
        setMarblePrice(marble.marblePrice)
        getElements()
    }, []);

    async function patchMarble(e) {
       e.preventDefault();
        if (marbleType == "") toast.error("Mermer Türü Ekleyin!!")
        else if (marblePrice == null || marblePrice<0 ) toast.error("Fiyat 0'dan Küçük veya Boş Olamaz")
        else {
            const formData = new FormData();
            formData.append('marbleId', marble._id);
            formData.append('marblePrice', marblePrice);
            formData.append('marbleType', marbleType);
            formData.append('elementsValues', JSON.stringify(state.elementsValues));
            toast.warn("Mermer Güncelleniyor",{autoClose:15000});
            const response = await fetch('/api/admin/patchMarble', {
                method: 'PATCH',
                body: formData
            })
            if (response.ok) {
                toast.dismiss();
                toast.success("Mermer Başarıyla Güncellendi")
            }
            else{
                toast.error("Mermer Günllenemedi!!")
            }
        }

    }
    async function getElements() {
        var bufferArray = [];
        for (const content of marble.imageList) {
            const response = await fetch(content.name);
            const blob = await response.blob();
            const buffer = await blob.arrayBuffer();
            const file = new File([blob], content.name, { type: blob.type });
            const base64 = await fileToBase64(file);
            bufferArray.push({ id: content.id, data: base64, buffer: buffer, imageType: file.type });
        }
        setState({ elementsValues: bufferArray });
    }
    
    const deleteArea = (elementId) => {
        var updatedState = state.elementsValues.filter((elementsValue) => elementsValue.id !== elementId)
        updatedState = updatedState.map((elementsValue, index) => ({
            ...elementsValue,
            id: index,
        }))
        setState({elementsValues: updatedState}); 
    }
    const addImageArea = () => {
        const elementId = state.elementsValues.length;
        const newItem = { id: elementId, data: "", buffer: "", imageType: "" }
        setState({ elementsValues: [...state.elementsValues, newItem] })
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
    function createImage(image) {
        let src = assets.uploadImage;
        if (image.buffer != "") {
            const buffer = image.buffer;
            const blob = new Blob([buffer])
            src = URL.createObjectURL(blob);
            return <Image fill={true} alt='seçilen_resim' src={src} onLoad={() => URL.revokeObjectURL(src)} id={image.id + "-img"} ></Image>
        }
        else {
            return <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
        }

    }

    function createElements() {
        return state.elementsValues.map((elementsValue) => {
            return <div key={elementsValue.id} className="relative flex items-center justify-center w-3/5 min-w-[270px] max-w-[700px]">
                <label htmlFor={elementsValue.id} className="flex flex-col items-center justify-center w-full  h-[300px] p-2 md:h-[600px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100  dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <span className='text-sm font-medium text-white p-1 mb-2'>Alt Resim</span>
                    <button onClick={(e) => { deleteArea(elementsValue.id) }} className='absolute right-[-10px] top-[-10px] z-10 px-2 py-1 border rounded-full border-white bg-red-600 text-white '>Sil</button>
                    <div className="relative flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
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
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Image Modal"
            ariaHideApp={false}
            style={customStyles}
            className="w-[80%] h-full md:w-[80%] fixed top-1/2 left-1/2 flex flex-col items-center gap-4 m-4 p-4 overflow-y-scroll rounded transform -translate-x-1/2 -translate-y-1/2 bg-slate-400 z-15"

        >
            <div className='flex flex-col items-center gap-4 w-full'>
            <h1 className='font-extrabold text-2xl text-slate-100 text-center mb-5'>Mermer Düzenleme Sayfası</h1>
            <div className='relative flex flex-col w-2/5 min-w-[270px]'>
                <label htmlFor="marbleType" className="w-fit text-sm font-medium text-white bg-gray-700 border p-1.5 rounded-lg border-gray-600 ">Mermer Türü</label>
                <select name='countries' defaultValue={marbleType} onChange={(e) => setMarbleType(e.target.value)} className="h-[40px] bg-gray-700 border border-gray-600 placeholder-gray-400 text-white text-sm rounded-lg  focus:border-gray-600 block w-full p-2.5b">
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
                        defaultValue={marblePrice}
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
                <button type="button" onClick={(e) => {patchMarble(e)}} className="text-white bg-gradient-to-r from-green-700 via-green-700 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-md shadow-teal-500/50 dark:shadow-md dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Mermeri Güncelle</button>
            </div>
            <button onClick={onRequestClose} className='absolute right-[-1px] top-[-1px] md:right-5 md:top-5 z-10 px-2 py-1 border rounded-full border-white bg-red-600 text-white'>Kapat</button>
        </Modal>
    );
};