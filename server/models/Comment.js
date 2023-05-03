import mongoose from "mongoose";
const schema = mongoose.Schema

const commentSchema = new schema({
    userID: {
        type: String,
        required: true
    },
    videoID: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},{timestamps:true,versionKey:0});

export default mongoose.model('Comment',commentSchema);