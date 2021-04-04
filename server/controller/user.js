import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        
        const isUser = await User.findOne({email});

        if(!isUser){
            return null;
           // return res.json(404).json({message: "User not found"});
        }

        const isPassword = await bcrypt.compare(password, isUser.password);
        //console.log(isPassword);
        if(!isPassword){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        // Authentication server verifies the credentials and issues a jwt signed using either a secret salt or a private key.
        const token = jwt.sign({email: isUser.email, id: isUser._id}, secret, {expiresIn: "1h"});

        res.status(200).json({result: isUser, token});

    } catch (error) {
        console.log(error);
        //res.status(500).json({message: "Oops! Something went wrong."});
    }
}

export const signUp = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    try {
        const isUser = await User.findOne({email});

        if(isUser){
            return null;
           //return res.status(400).json({message: "User already exists"});
        }

        if(password !== confirmPassword){
            return null;
            //return res.status(400).json({message: "Passwords don't match"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({name: `${firstName} ${lastName}`, email, password: hashedPassword});

        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});

        res.status(200).json({result, token});
    } catch (error) {
        console.log(error);
        //res.status(500).json({message: "Oops! Something went wrong."});
    }
}