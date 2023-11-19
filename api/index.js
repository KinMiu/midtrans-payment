import dotenv from 'dotenv'
import app from './app.js'

dotenv.config()

app.get('/', (req, res) => {
  res.send('Welcome to Payment Gateway Testing API')
})

app.listen(process.env.PORT, () => {
  console.log(`SERVER RUNNING IN PORT ${process.env.PORT}`)
})