import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { MarbleModel } from "@/config/models/marbleModel";
import { ConnectDb } from "@/config/database/mongoDb";

const LoadDB = async () => {
    await ConnectDb();
}

export async function DELETE(req, { params }) {
    console.log("admin marble DELETE HIT");
    const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_TOKEN });
    await LoadDB();
    const formData = await req.formData()

    //delete post request
    const id = formData.get("id")
    const deletedBlog = await MarbleModel.findOneAndDelete({ _id: id });

    const imagesToDelete = [];
    for (var content of deletedBlog.imageList) {
        const contentImageKey = content.name.split("https://utfs.io/f/")[1]
        imagesToDelete.push(contentImageKey)
    }
    await utapi.deleteFiles(imagesToDelete)

    return NextResponse.json({ status: true });
    
}