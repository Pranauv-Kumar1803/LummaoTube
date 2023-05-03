import express from 'express'
import verifyToken from '../verifyToken.js';
import {postVideo, updateVideo, deleteVideo, getVideo, addViews, trendVideos, randomVideos, subscribedVideos, getVideoByTags, getVideoByTitle} from '../controllers/video.js';

const router = express.Router();

// get video
router.get('/find/:id',getVideo)

// update views of a video
router.put('/view/:id',addViews)

// trend videos
router.get('/trend',trendVideos)

// random videos
router.get('/random',randomVideos)

// subscribed channel videos
router.get('/subscribed',verifyToken,subscribedVideos)

// search videos by tags
router.get('/tags',getVideoByTags)

// search videos by title
router.get('/search',getVideoByTitle)

// creating a video 
router.post('/',verifyToken, postVideo);

// update video
router.put('/:id',verifyToken, updateVideo);

// delete video
router.delete('/:id',verifyToken, deleteVideo);

export default router;
 