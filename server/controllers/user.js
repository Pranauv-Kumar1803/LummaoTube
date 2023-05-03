import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const updateUser = async (req,res,next) => {
    if(req.params.id !== req.user) {
        return next(createError(400,"You can update only your account!"))
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(200).json(updateUser)
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async(req,res,next) => {
    if(req.params.id !== req.user) {
        return next(createError(400,"You can only delete your account!"))
    }

    try {
        const updateUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req,res,next) => {
    try {
        const users = await User.findById(req.params.id);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const subscribeUser = async (req,res,next) => {
    try {
        console.log('inside');
        await User.findByIdAndUpdate(req.user,{
           $push: {subscribedUsers: req.params.id} 
        });

        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: 1}
        })

        return res.status(200).json("subscription successfull");
    } catch (err) {
        next(err);
    }
}

export const unsubscribeUser = async (req,res,next) => {
    try {
        await User.findByIdAndUpdate(req.user,{
           $pull: {subscribedUsers: req.params.id} 
        });

        await User.findByIdAndUpdate(req.params.id,{
            $inc: {subscribers: -1}
        })

        return res.status(200).json("unsubscription successfull");
    } catch (err) {
        next(err);
    }
}

export const likeUser =async  (req,res,next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id,{
           $addToSet: {likes: req.user},
           $pull: {dislikes: req.user}
        });

        return res.status(200).json("video has been liked");

    } catch (err) {
        next(err);
    }
}

export const dislikeUser = async (req,res,next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id,{
            $addToSet: {dislikes: req.user},
            $pull: {likes: req.user}
         });
 
         return res.status(200).json("video has been disliked");
 
    } catch (err) {
        next(err);
    }
}