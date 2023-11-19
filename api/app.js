import dotenv from 'dotenv'
import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import paymentRoute from './routes/paymentRoutes.js'

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/api/payment', paymentRoute)

export default app