import express from "express";
import mongoose from "mongoose";
import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async(req,res,next)=>{
    try {
        const user = await User.findOne({email: req.body.email}).exec();

        if(user) {
            return next(createError(400,'User Already Exists!'));
        }

        const newPassword = await bcrypt.hash(req.body.password,10);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })

        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
}

export const signin = async(req,res,next)=>{
    try {
        const {name,password} = req.body;

        const user = await User.findOne({name: name}).exec();

        if(!user) {
            return next(createError(404,'user not found'));
        }
        
        const check = await bcrypt.compare(password, user.password);
        
        if(!check) {
            return next(createError(400,'Wrong Password Entered'));
        }

        const token = await jwt.sign(
            {
                id: user._id
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        const {password: _, ...others} = user._doc;

        console.log(others);

        res.cookie('access_token',token,{
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json(others);
    } catch (err) {
        next(err);
    }
}

export const googleAuth = async(req,res,next) =>{
    try {
        const user = await User.findOne({email: req.body.email});

        if(user) {
            const token = await jwt.sign(
                {
                    id: user._id
                },
                process.env.ACCESS_TOKEN_SECRET
            );
    
            res.cookie('access_token',token,{
                httpOnly: true
            }).status(200).json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            });

            const savedUser = await newUser.save();
            const token = await jwt.sign(
                {
                    id: newUser._id
                },
                process.env.ACCESS_TOKEN_SECRET
            );
    
            res.cookie('access_token',token,{
                httpOnly: true,
                sameSite: "none",
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            }).status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
}