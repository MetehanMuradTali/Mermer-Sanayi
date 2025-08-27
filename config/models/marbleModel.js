import mongoose, { mongo } from "mongoose";

const Schema = new mongoose.Schema({
    marblePrice: {
        type: Number,
        required: true
    },
    marbleType:{
        type: String,
        required:true,
    },
    imageList:{
        type:[],
        required:true
    },
    createdAt: { type: Date, default: Date.now }

})

export var MarbleModel = mongoose.models.marble || mongoose.model('marble', Schema);