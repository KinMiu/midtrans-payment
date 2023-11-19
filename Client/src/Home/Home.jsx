import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, TextField } from '@mui/material'

const Home = () => {
  const [name, setName] = useState('')
  const [orderID, setOrderId] = useState('')
  const [total, setTotal] = useState(0)

  const [token, setToken] = useState('')

  const process = async () => {
    const data = {
      name: name,
      order_id: orderID,
      total: total
    }

    const config = {
      headers: {
        "Content-Type": 'application/json'
      }
    }

    
    const res = await axios.post('http://localhost:5000/api/payment/transaksi', data, config)
    setToken(res.data.token)
  }

  useEffect(() => {
    if(token){
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result))
          setToken('')
        },
        onPending: (result) => {
          localStorage.setItem('Pembayaran', JSON.stringify(result))
          setToken('')
        },
        onError: (error) => {
          console.log(error)
          setToken('')
        },
        onClose: () => {
          console.log("Anda Belum Menyelesaikan Penbayaran")
          setToken('')
        }
      })
      setName('')
      setOrderId('')
      setTotal('')
    }
  }, [token])

  useEffect(() => {
    const midtransUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransUrl

    const midtransClientKey = "SB-Mid-client-uR-0ymMgWpMGsTGW"
    scriptTag.setAttribute('data-client-key', midtransClientKey)

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '90vw', padding: '20px'}}>
      <TextField sx={{mb: 2}} type='text' label="Nama" value={name} onChange={(e) => setName(e.target.value)}/>
      <TextField sx={{mb: 2}} type='text' label="Order ID" value={orderID} onChange={(e) => setOrderId(e.target.value)}/>
      <TextField sx={{mb: 2}} type='number' label="Total" value={total} onChange={(e) => setTotal(e.target.value)}/>
      <Box>
        <Button onClick={process} variant='outlined'>Process</Button>
      </Box>
    </Box>
  )
}

export default Home