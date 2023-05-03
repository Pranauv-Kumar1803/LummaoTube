import { createError } from '../error.js';
import Comment from '../models/Comment.js'
import Video from '../models/Video.js';

export const addComment = async(req,res,next)=>{
    try {
        const newComment = new Comment({
            userID: req.user,
            ...req.body
        });

        await newComment.save();
        return res.status(201).json(newComment);
    } catch (err) {
        next(err);
    }
}

export const updateComment = async(req,res,next)=>{
    try {
    } catch (err) {
        next(err);
    }
}

export const getComment = async(req,res,next)=>{
    try {
        const comment = await Comment.find({videoID: req.params.videoid});

        return res.status(200).json(comment);

    } catch (err) {
        next(err);
    }
}

export const deleteComment = async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id);       
        const video = await Video.findById(req.params.id);

        if(req.user == comment.userID || req.user == video.userID) {
            await Comment.findByIdAndDelete(req.params.id);
            return res.status(200).json("comment deleted successfully");
        }
        else
        {
            next(createError(403, "you can only delete your comment!"));
        }
    } catch (err) {
        next(err);
    }
}

