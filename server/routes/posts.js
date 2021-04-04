import express from "express";
import {getPosts, createPost, updatePost, deletePost, likePost} from "../controller/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', getPosts);
// all the request which have auth parameter will call auth middleware where we will check for authentication
router.post('/', auth, createPost);

router.patch('/:id', auth, updatePost);

router.delete('/:id', auth, deletePost);

// id and the post to be liked
router.patch('/:id/likePost', auth, likePost);

export default router;