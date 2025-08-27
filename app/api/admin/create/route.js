import { NextResponse } from "next/server";
import { ConnectDb } from "@/config/database/mongoDb";
import { AdminModel } from "@/config/models/adminModel";

const LoadDB = async () => {
    await ConnectDb();
}

export async function POST(req) {
    console.log("admin create post hit");
    const { email, password } = await req.json()
    await LoadDB();
    //const admin = await AdminModel.find({ email: email, password, password });
    const admin = await AdminModel.create({email:email,password:password})
    

}