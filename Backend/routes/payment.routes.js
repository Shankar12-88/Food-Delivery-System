import { Router } from 'express'
import { initiateEsewaPayment } from '../controllers/payment.controller.js'

const paymentRouter = Router()

paymentRouter.post('/esewa/initiate', initiateEsewaPayment)

export default paymentRouter
