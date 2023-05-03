import mongoose from "mongoose";
const schema = mongoose.Schema

const videoSchema = new schema({
    userID: {
        type: String,
        required: 1
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String]
    },
    likes: {
        type: [String]
    },
    dislikes: {
        type: [String]
    },
}, { timestamps: true, versionKey: 0 });

export default mongoose.model('Video', videoSchema);