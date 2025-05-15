import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js';
import { User } from '../models/user.model.js';



export async function protectRoute ( req: Request, res: Response, next: NextFunction ) {
  try {
    const token = req.cookies['jwt-netflix']

    if (!token) {
      res.status(401).json({ success: false, message: 'Unauthorized - No Token Provided' })
      return
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET!) as JwtPayload

    if (!decoded) {
      res.status(401).json({ success: false, message: 'Unauthorized - Invalid Token' })
      return
    }

    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' })
      return
    }

    req.user = user

    next()
  } catch (error: any) {
    console.log('Error in protectRoute middleware: ', error.message)

    res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
}