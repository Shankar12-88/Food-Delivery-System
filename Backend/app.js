import cookieParser from 'cookie-parser'
import express from 'express'
import paymentRouter from './routes/payment.routes.js'
import userRouter from './routes/user.routes.js'
import cors from 'cors'
import { restaurantRoute } from './routes/restaurantRoute.js'
import { foodRoute } from './routes/foodRoute.js'
import { userQueryRouter } from './routes/userQueryRoute.js'

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  // origin: "*",
  credentials: true
}
))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/users', userRouter) //userController routes
app.use('/api/payments', paymentRouter)
app.use('/api/restaurant', restaurantRoute) //restaurantController routes
app.use('/api/food', foodRoute) //foodController routes
app.use('/api/userquery', userQueryRouter) //userQueryController routes


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  })
})

export default app
