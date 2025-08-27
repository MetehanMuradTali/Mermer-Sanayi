import Sidebar from '@/components/admin/sidebar/Sidebar'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

const layout = async ({ children }) => {
    const session = await getServerSession(authOptions)
    var isAdminLoggedIn = false;
    if(session != null){
        if(session.user.email != undefined){
            isAdminLoggedIn = true;
        }
    }
    if(!isAdminLoggedIn){
        redirect("/admin/login")
    }
    return (
        <div>
            <div className='flex flex-row'>
                <Sidebar/>
                {children}
            </div>
        </div>
    )
}

export default layout