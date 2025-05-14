import { Request, Response } from "express";
import { User, userType } from "../models/user.model.js";
import bcryptjs from "bcryptjs";






export async function signup( req: Request, res: Response ) {
  try {
    const { username, password, email  }: userType = req.body

    if (!username || !password || !email) {
      res.status(400).json({ success: false, message: 'All fields are required' })
      return
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, message: 'Invalid email' })
      return
    }

    if (password.length < 6) {
      res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
      return
    }

    const existingUserByEmail = await User.findOne({ email: email })

    if (existingUserByEmail) {
      res.status(400).json({ success: false, message: 'Email already exists' })
      return
    }

    const existingUserByUsername = await User.findOne({ username: username })

    if (existingUserByUsername) {
      res.status(400).json({ success: false, message: 'Username already exists' })
      return
    }


    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)


    const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png']

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      image
    })

    await newUser.save()

    const { password: _, ...userWithoutPassword } = newUser.toObject()
    

    res.status(201).json({ success: true, user: userWithoutPassword})
  } catch (error: any) {
    console.log('Error in signup controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function login( req: Request, res: Response ) {
  
}


export async function logout( req: Request, res: Response ) {
  
}