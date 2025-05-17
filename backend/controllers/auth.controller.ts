import { Request, Response } from "express";
import { User, userType } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";




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

    
    generateTokenAndSetCookie(newUser._id.toString(), res)
    
    await newUser.save()
    
    const { password: _, ...userWithoutPassword } = newUser.toObject()
    
    res.status(201).json({ success: true, user: userWithoutPassword})
  


  } catch (error: any) {
    console.log('Error in signup controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function login( req: Request, res: Response ) {
  try {
    const { email, password}: userType = req.body

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'All fields are required' })
      return
    }

    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(404).json({ success: false, message: 'Invalid credentials' })
      return
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
      res.status(400).json({ success: false, message: 'Invalid credentials' })
      return
    }


    generateTokenAndSetCookie(user._id.toString(), res)

    const { password: _, ...userWithoutPassword } = user.toObject()
    
    res.status(201).json({ success: true, user: userWithoutPassword})
  } catch (error: any) {
    console.log('Error in login controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function logout( req: Request, res: Response ) {
  try {
    res.clearCookie('jwt-netflix')

    res.status(200).json({ success: true, message: 'Logged out successfully' })
    
  } catch (error: any) {
    console.log('Error in logout controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


export async function authcheck( req: Request, res: Response ) {
  try {
    res.status(200).json({ success: true, user: req.user })
  } catch (error: any) {
    console.log('Error in authcheck controller', error.message)

    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}