import mongoose, { mongo } from "mongoose";

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

export var AdminModel = mongoose.models.admin || mongoose.model('admin', Schema);