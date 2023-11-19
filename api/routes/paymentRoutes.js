import dotenv from 'dotenv'
import express from 'express'
import midTranst from 'midtrans-client'

dotenv.config()
const router = express.Router()

router.post('/transaksi', (req, res) => {
  try {
    const snap = new midTranst.Snap({
      isProduction: false,
      serverKey: process.env.SERVERKEY,
      clientKey: process.env.CLIENTKEY
    })

    const parameter = {
      transaction_details: {
        order_id: req.body.order_id,
        gross_amount: req.body.total
      },
      customer_details: {
        first_name: req.body.name
      }
    }

    snap.createTransaction(parameter).then((transaksi) => {
      const dataPayment = {
        response: JSON.stringify(transaksi)
      }
      const token = transaksi.token
      res.status(200).json({ message: 'Success', dataPayment, token: token })
    }).catch((err) => {
      console.log(err)
    })

  } catch (error) {
    res.status(500).json({ message: "Terjadi error" })
  }
})

export default router