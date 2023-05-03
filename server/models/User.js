import mongoose from "mongoose";
const schema = mongoose.Schema

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: String,
        required: true
    },
    password: {
        type: String,
    },
    img: {
        type: String
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers: {
        type: [String]
    },
    fromGoogle: {
        type: Boolean,
        default: false
    }
},{timestamps:true,versionKey:0});

export default mongoose.model('User',userSchema);