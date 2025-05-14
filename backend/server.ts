import express from 'express'


import { connectDB } from './config/db.js'
import { ENV_VARS } from './config/envVars.js'


import authRoutes from './routes/auth.route.js'






const PORT = ENV_VARS.PORT
const app = express()


app.use(express.json())


app.use('/api/v1/auth', authRoutes)


app.listen( PORT, () => {
  console.log(`Nice to see you again！SIR！At ${PORT}！`)

  connectDB()
})