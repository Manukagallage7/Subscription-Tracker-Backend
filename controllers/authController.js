import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import User from '../models/userModel.js'

//What is a req body? -> req.body is an object containing data from th client(POST request)

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try{
        const { name, email, password} = req.body
        //Check if a user already exists
        const exitingUser = await User.findOne({email})

        if(exitingUser) {
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{name,email,password:hashedPassword}], { session})

        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        
        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success: true,
            message: 'User Created Successfully',
            data: {
                token,
                user: newUser
            }
        })
    }catch(err){
        await session.abortTransaction()
        session.endSession()
        next(err)
    }
}

export const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) {
            const error = new Error('User not found')
            error.statusCode = 404
            throw error
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            const error = new Error('Invalid Password')
            error.statusCode = 401
            throw error
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET,  {expiresIn: JWT_EXPIRES_IN})

        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        })
    } catch (err) {
        next(err)
    }
}

export const signOut = async (req, res, next) => {
    
}