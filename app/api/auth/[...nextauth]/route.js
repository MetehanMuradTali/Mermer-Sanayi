import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            creadentials:{
                email: { label: "email", type: "text", placeholder: "email@gmail.com" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req){
                const email = credentials.email;
                const password = credentials.password;
                const response = await fetch(`${process.env.URL}/api/admin/login`, {
                    method: 'POST',
                    body: JSON.stringify({email:email,password:password}),
                    headers: { "Content-Type": "application/json" }
                  });
                const res = await response.json()                
                if(res.status == "success"){
                    return res.admin
                }
                else{
                    return null;
                }
            }
        })
    ],
    pages:{
        signIn:"/admin/login",
    }
}

const handler= NextAuth(authOptions)

export { handler as GET, handler as POST }


