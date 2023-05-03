import { createError } from "../error.js";
import User from "../models/User.js";
import Video from '../models/Video.js';

export const postVideo = async(req,res,next) => {
    try {
        const newVideo = new Video({
            userID: req.user, ...req.body
        });

        await newVideo.save();
        return res.status(201).json(newVideo);
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async(req,res,next) => {
    try {
        const updateVideo = await Video.findById(req.params.id);
        if(!updateVideo) return next(createError(404,'video not available'));

        if(req.user == updateVideo.userID) {
            const update = await Video.findByIdAndUpdate(req.params.id,{
                $set: req.body
            }, {new : true});

            return res.status(200).json(update);
        }
        else
        {
            return next(createError(404,'you can only update your video'));
        }
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async(req,res,next) => {
    try {
        const Video = await Video.findById(req.params.id);
        if(!Video) return next(createError(404,'video not available'));

        if(req.user == Video.userID) {
            await Video.findByIdAndDelete(req.params.id);

            return res.status(200).json("deleted successfully");
        }
        else
        {
            return next(createError(404,'you can only delete your video'));
        }

    } catch (err) {
        next(err);
    }
}

export const getVideo = async(req,res,next) => {
    try {
        const video = await Video.findById(req.params.id);

        return res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}

export const trendVideos = async(req,res,next) => {
    try {
        const videos = await Video.find().sort({views: -1});
        return res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const randomVideos = async(req,res,next) => {
    try {
        const videos = await Video.aggregate([{$sample:{size: 40}}])
        return res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const subscribedVideos = async(req,res,next) => {
    try {
        const users = await User.findById(req.user);

        const subscribed = users.subscribedUsers;

        const list = await Promise.all(
            subscribed.map((channel)=>{
                return Video.find({userID: channel})
            })
        )

        return res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
}

export const addViews = async(req,res,next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc: {views: 1}
        });

        return res.status(200).json("views have been increased");
    } catch (err) {
        next(err);
    }
}

export const getVideoByTags = async(req,res,next) => {
    const tag = req.query.tags.split(',');
    console.log(tag);
    try {
        const video = await Video.find({tags: {$in: tag}});

        return res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}

export const getVideoByTitle = async(req,res,next) => {
    const query = req.query.title;
    try {
        const video = await Video.find({title: {$regex: query, $options: 'i'}}).limit(40);

        return res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}