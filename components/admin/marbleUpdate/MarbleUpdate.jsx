"use client"
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import MarbleUpdateModal from '../marbleUpdateModal/MarbleUpdateModal';
import { toast } from 'react-toastify';

const MarbleUpdate = () => {

    const [marblelist, setMarbleList] = useState({ marbles: [], isLastPage: false, status: "initial" });
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState({status:false,marble:null});
    const [selectedMarbleType, setSelectedMarbleType] = useState("DÜZ MEZAR")

    useEffect(() => {
        Modal.setAppElement('body');
        getRequest("DÜZ MEZAR");
    }, []);

    const getRequest = async (marbleType) => {
        console.log("selected Marble type => ",marbleType);
        setSelectedMarbleType(marbleType);
        fetch(`/api/admin/marbles/${marbleType}`, {cache:"no-store"})
            .then(async (res) => await res.json())
            .then(async (data) => {
                setMarbleList({ marbles: data.marbles,status: "finished" })
            }).catch((error)=>{
                console.log("errrorr ==> ", error);
            })
    };

    const openModal = (marble) => {
      setModalIsOpen({marble:marble,status:true})
    };

    const closeModal = () => {
        setModalIsOpen({marble:null,status:false})
    };

    const deletePost = async (e, id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        toast.warning("Mermer Siliniyor")
        const response = await fetch(`/api/admin/deleteMarble`, {
            method: 'DELETE',
            body: formData
        })
        toast.dismiss();
        if (response.ok) {
            toast.success("Mermer Başarıyla Silindi")
            getRequest(selectedMarbleType)
        }
        else{
            toast.error("Mermer Silinemedi!!")
        }

    }
    return (
        <div className='flex flex-col w-full min-h-screen items-center px-5 py-5 gap-7 bg-slate-400'>
            <h1 className='font-extrabold text-2xl text-slate-100 text-center mb-5'>Mermer Düzenleme Sayfası</h1>
            <h2>Seçilen Arama Türü : {selectedMarbleType}</h2>
            <div className='flex flex-row w-2/5 gap-5'>
                <button className="flex-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" 
                 onClick={()=>{getRequest("DÜZ MEZAR")}}>DÜZ MEZAR</button>
                <button className="flex-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                 onClick={()=>{getRequest("BABALI MEZAR")}}>BABALI MEZAR</button>
                <button className="flex-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" 
                onClick={()=>{getRequest("ÇİFTLİ MEZAR")}}>ÇİFTLİ MEZAR</button>
                <button className="flex-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                  onClick={()=>{getRequest("BEBEK MEZARI")}}>BEBEK MEZARI</button>
                <button className="flex-auto rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                 onClick={()=>{getRequest("ÇEŞME")}}>ÇEŞME</button>
            </div>
            <div className='relative flex flex-col w-2/5 min-w-[300px] gap-2 '>
                {marblelist.status == "finished" ? marblelist.marbles.map((marble, index) => {
                    var marbleId = (pageNumber-1)*6+index;
                    var marbleType = marble.marbleType;
                    var marblePrice = marble.marblePrice;
                    var marbleID = marble._id;
                    var displayNumber = marble.displayNumber;


                    return (
                        <div key={index} className='relative flex justify-between items-center gap-4 bg-gray-700 border border-gray-700 rounded w-full h-[100px] '>
                            <div className='flex flex-row justify-between mx-3 text-white lg:mx-5 '>
                                <span className='font-medium text-lg line-clamp-1 mr-4'>{displayNumber}</span>
                                <span className='font-medium text-lg line-clamp-1 mr-4'>{marbleType}</span>
                                <span className='font-medium text-lg line-clamp-1'>{marblePrice} TL</span>
                            </div>
                            <div className='flex items-center justify-center gap-2 h-min flex-col md:flex-row mr-2'>
                                <button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-3 py-1.5 text-center'
                                    onClick={() => openModal(marble)}>
                                    Düzenle</button>
                                <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                    onClick={(e) => { deletePost(e, marbleID) }}>
                                    Sil
                                </button>
                            </div>
                        </div>
                    )
                }) : ""}
            </div>
            {
                marblelist.status == "finished" && modalIsOpen.status && <MarbleUpdateModal
                    marble={modalIsOpen.marble}
                    isOpen={modalIsOpen.status}
                    onRequestClose={closeModal}
                />
            }
            <div className='grid grid-cols-2 md:grid-cols-4  md:max-w-[500px] gap-3 md:gap-5  justify-center items-center '>
                {parseInt(pageNumber) <= 1 ?
                    ""
                    : <button className='text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={(e) => {
                        e.preventDefault();
                        fetch(`/api/admin/marbles/${pageNumber - 1}`)
                            .then((res) => res.json())
                            .then(async (data) => {
                                setMarbleList({ marbles: data.marbles, isLastPage: data.isLastPage, status: "finished" })
                            });
                        setPageNumber(pageNumber - 1);

                    }}
                    >Önceki  Sayfa
                    </button>}
                {
                    marblelist.isLastPage == true ?
                        ""
                        : <button className='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={(e) => {
                            e.preventDefault();
                            fetch(`/api/admin/marbles/${pageNumber + 1}`)
                                .then((res) => res.json())
                                .then(async (data) => {
                                    setMarbleList({ marbles: data.marbles, isLastPage: data.isLastPage, status: "finished" })
                                });
                            setPageNumber(pageNumber + 1);
                        }}>Sonraki  Sayfa</button>
                }
            </div>
        </div>
    )
}

export default MarbleUpdate
