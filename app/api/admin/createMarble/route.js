import { NextResponse } from "next/server";
import { ConnectDb } from "@/config/database/mongoDb";
import { UTApi } from "uploadthing/server";
import { MarbleModel } from "@/config/models/marbleModel";

const LoadDB = async () => {
    await ConnectDb();
}
export async function POST(req) {
    const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_TOKEN });
    
    console.log("admin Marble POST HIT");

    const formData = await req.formData()
    const marblePrice = formData.get("marblePrice")
    const marbleType = formData.get("marbleType")
    const elementsValues = formData.get("elementsValues")
    const parsedElementsValues = JSON.parse(elementsValues)

    //Saving Images and Updating Content

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
    await MarbleModel.create(marbleData);
    console.log("Marble Created And Saved")
    return NextResponse.json({ success: true, msg: "Marble Created And Saved" });
}
/*
export async function DELETE(req, { params }) {
    console.log("admin blog DELETE HIT");
    const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_SECRET });
    await ConnectDb();

    const formData = await req.formData()
    const option = formData.get("option")

    if (option == "comment_delete") {
        //delete comment request
        const data = formData.get("data")
        const name = formData.get("name")
        const date = formData.get("date")
        const blog = await HaberModel.findOneAndUpdate({ date: date }, { $pull: { comments: { name: name, data: data } } }, { returnOriginal: false });
        const commentList = blog.comments;
        return NextResponse.json({ comments: commentList });
    }
    else {
        //delete post request
        const date = formData.get("date")

        const deletedBlog = await HaberModel.findOneAndDelete({ date: date });

        const imagesToDelete = [];
        const coverImageKey = deletedBlog.coverImage.split("https://utfs.io/f/")[1]
        imagesToDelete.push(coverImageKey)
        for (var content of deletedBlog.content) {
            if (content.type == "image") {
                const contentImageKey = content.name.split("https://utfs.io/f/")[1]
                imagesToDelete.push(contentImageKey)
            }
        }
        await utapi.deleteFiles(imagesToDelete)

        return NextResponse.json({ status: true });
    }

}

export async function PATCH(req, { params }) {
    console.log("admin blog UPDATE HIT");
    const utapi = new UTApi({ apiKey: process.env.UPLOADTHING_SECRET });

    const formData = await req.formData()
    const coverImage = formData.get("coverImage")
    const title = formData.get("title")
    const categories = formData.get("categories")
    const parsedCategories = JSON.parse(categories)
    const elementsValues = formData.get("elementsValues")
    const parsedElementsValues = JSON.parse(elementsValues)
    const date = new Date(formData.get("date")).getTime();

    //delete previous images
    const imagesToDelete = []
    const blog = await HaberModel.findOne({ date: date });
    const coverImageKey = blog.coverImage.split("https://utfs.io/f/")[1]
    imagesToDelete.push(coverImageKey)
    for (var content2 of blog.content) {
        if (content2.type == "image") {
            const contentImageKey = content2.name.split("https://utfs.io/f/")[1]
            imagesToDelete.push(contentImageKey)
        }
    }
    await utapi.deleteFiles(imagesToDelete)

    //upload new images
    const content = []
    const images = []
    for (var element of parsedElementsValues) {
        if (element.type == "image") {
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
    }
    const ImagesResponses = await utapi.uploadFiles(images)
    for (var element of parsedElementsValues) {
        if (element.type == "paragraph") {
            content.push({ ...element })
        }
        else if (element.type == "sub-header") {
            content.push({ ...element })
        }
        else if (element.type == "image") {
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
            content.push({ id: element.id, type: element.type, name: correpondingResponse.data.url })
        }
    }

    const coverImageResponse = await utapi.uploadFiles(coverImage)
    const blogData = {
        title: title,
        coverImage: coverImageResponse.data.url,
        content: content,
        categories: parsedCategories,
        viewCount: blog.viewCount,
        comments: [],
        date: date
    };

    await LoadDB();
    await HaberModel.findOneAndUpdate({ date: date }, blogData);
    console.log("Haber Güncellendi")
    return NextResponse.json({ success: true, msg: "Haber Güncellendi" });

}*/