"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

  return (
    <div className=''>
            <button
                onClick={toggleSidebar}
                type="button"
                className="absolute inline-flex items-center p-2 mt-2 ms-3 bg-gray-800 text-lg text-white rounded-lg lg:hidden hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            >
                <span className="sr-only">Open sidebar</span>
                <span>Menü</span>
            </button>

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
                    <h1 className='font-extrabold text-2xl text-white text-center mb-5'>Admin Paneli</h1>
                    <ul className="space-y-6 font-medium mt-[40px]">
                        <li>
                            <Link
                                href={"/admin/options/marbleAdd"}
                                className="p-3 text-white rounded-lg hover:text-gray-800 hover:bg-gray-100"
                            >
                                <span className="whitespace-nowrap">Mermer Ekle</span>

                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/admin/options/marbleUpdate"}
                                className="p-3 text-white rounded-lg hover:text-gray-800 hover:bg-gray-100 group"
                            >
                                <span className="whitespace-nowrap">Mermerleri Düzenle</span>

                            </Link>
                        </li>
                        <li onClick={async (e) => {
                            e.preventDefault;
                            signOut({callbackUrl:"/admin/login"})
                        }}>
                            <button className="p-3 text-white rounded-lg hover:text-gray-800 hover:bg-gray-100 group">
                                <span className="whitespace-nowrap">Çıkış Yap</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
  )
}

export default Sidebar