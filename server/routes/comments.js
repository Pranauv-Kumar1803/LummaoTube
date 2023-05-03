import express from 'express'
import verifyToken from '../verifyToken.js';
import { addComment, deleteComment, getComment, updateComment } from '../controllers/comment.js';
const router = express.Router();

// get comment
router.get('/:videoid',verifyToken,getComment);

// add comment
router.post('/',verifyToken,addComment);

// update comment
router.put('/:id',verifyToken,updateComment);

// delete comment
router.delete('/:id',verifyToken,deleteComment);

export default router;