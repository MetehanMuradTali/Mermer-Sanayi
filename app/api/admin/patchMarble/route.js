import { NextResponse } from "next/server";
import { ConnectDb } from "@/config/database/mongoDb";
import { MarbleModel } from "@/config/models/marbleModel";
import { UTApi } from "uploadthing/server";


const LoadDB = async () => {
    await ConnectDb();
}

export async function PATCH(req, { params }) {
    console.log("admin marble UPDATE HIT");
    const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_TOKEN });

    const formData = await req.formData()
    const marbleId = formData.get("marbleId")
    const marblePrice = formData.get("marblePrice")
    const marbleType = formData.get("marbleType")
    const elementsValues = formData.get("elementsValues")
    const parsedElementsValues = JSON.parse(elementsValues)

    //delete previous images
    const imagesToDelete = []
    const marble = await MarbleModel.findOne({ _id: marbleId });
    for (var content2 of marble.imageList) {
        const contentImageKey = content2.name.split("https://utfs.io/f/")[1]
        imagesToDelete.push(contentImageKey)
    }
    await utapi.deleteFiles(imagesToDelete)
   
    //upload new images
    const content = []
    const images = []
    for (var element of parsedElementsValues) {
        var fileName = element.id.toString();
        switch (element.imageType) {
            case "image/jpeg":
                fileName = fileName.concat(".jpg")
                break;
            case "image/png":
                fileName = fileName.concat(".png")
                break;
        }
        const buffer = Buffer.from(element.data, 'base64');
        const blob = new Blob([buffer])
        const file = new File([blob], fileName);
        images.push(file)
        
    }
    const ImagesResponses = await utapi.uploadFiles(images)
    for (var element of parsedElementsValues) {
        var fileName = element.id.toString();
        switch (element.imageType) {
            case "image/jpeg":
                fileName = fileName.concat(".jpg")
                break;
            case "image/png":
                fileName = fileName.concat(".png")
                break;
        }
        const correpondingResponse = ImagesResponses.find((file) => file.data.name == fileName)
        content.push({ id: element.id, name: correpondingResponse.data.url })
    }
    const marbleData = {
        marblePrice: marblePrice,
        marbleType:marbleType,
        imageList: content,
    };
    await LoadDB();
    await MarbleModel.findOneAndUpdate({ _id: marbleId }, marbleData);
    console.log("Mermer Güncellendi")
    return NextResponse.json({ success: true, msg: "Mermer Güncellendi" });

}