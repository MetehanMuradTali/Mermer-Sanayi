import AdminLogin from '@/components/admin/adminLogin/AdminLogin'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

const page = async () => {
    const session = await getServerSession(authOptions)
    var isAdminLoggedIn = false;
    if(session != null){
        if(session.user.email != undefined){
            isAdminLoggedIn = true;
        }
    }
    if(isAdminLoggedIn){
        redirect("/admin/options")
    }
    return (

        <div className='w-screen h-screen bg-slate-400'>
            <AdminLogin></AdminLogin>
        </div>

    )
}

export default page