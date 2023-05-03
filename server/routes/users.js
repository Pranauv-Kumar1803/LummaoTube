import express from 'express'
import { updateUser, deleteUser , getUser, likeUser, dislikeUser, subscribeUser, unsubscribeUser } from '../controllers/user.js';
import verifyToken from '../verifyToken.js'

const router = express.Router();

// update profile
router.put('/:id', verifyToken ,updateUser);

// deelete user
router.delete('/:id',verifyToken ,deleteUser);

router.get('/find/:id',getUser);

router.put('/sub/:id',verifyToken ,subscribeUser);

router.put('/unsub/:id',verifyToken ,unsubscribeUser);

router.put('/like/:id',verifyToken ,likeUser);
 
router.put('/dislike/:id',verifyToken ,dislikeUser);
 
export default router;
