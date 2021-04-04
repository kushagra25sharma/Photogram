import express from "express";
import PostMessage from "../models/postMessages.js";
import mongoose from "mongoose";


const router = express.Router();

export const getPosts = async (req, res) => { //wheneve we use await we have to make that function asynchronous
    try{
        // it wont immediately return the object so we use await 
        const postMessages = await PostMessage.find();
        //console.log(postMessages);
        res.status(200).json(postMessages);
    } catch(err){
        res.status(404).json({message: err.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
    
    try{
        await newPost.save();
        //console.log(newPost);
        res.status(201).json(newPost);
    } catch(err){
        res.status(409).json({message: err.message});
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("There is no post with that id.");
    }

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, {new: true});

    res.json(updatedPost);
    
}

export const deletePost = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("There is no post with that id.");
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({message: "Post deleted successfully"});
}

export const likePost = async (req, res) => {
    const {id} = req.params;

    // we have added auth (middleware func) before the likePost func that allow
    // us to populate the request in the middleware func and that can be used in next func i.e. likePost

    if(!req.userId){
        return res.json({message: "You are not authorized."});
    }

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send("There is no post with that id.");
    }

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));
    
    if(index === -1){
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true});
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});

    res.json(updatedPost);
}

export default router;