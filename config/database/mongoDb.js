import mongoose from 'mongoose';

export const ConnectDb = async () => {
    await mongoose.connect('mongodb+srv://admin:karabukmermerWeb@mermersanayiweb.kj1rc.mongodb.net/MermerSanayiWebNew?retryWrites=true&w=majority&appName=MermerSanayiWeb');
    console.log("DB connected");
}