import { NextResponse } from "next/server";
import { ConnectDb } from "@/config/database/mongoDb";
import { AdminModel } from "@/config/models/adminModel";

const LoadDB = async () => {
    await ConnectDb();
}

export async function GET(req) {
    console.log("GET HIT");
}

export async function POST(req) {
    const { email, password } = await req.json()
    await LoadDB();
    const admin = await AdminModel.find({ email: email, password, password });
    if (admin.length != 0) {
        //Admin found
        return NextResponse.json({ status: "success", admin: admin[0] })
      }
      else {
        //Admin not found
        return NextResponse.json({ status: "failed" })
    }

}