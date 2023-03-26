import React, { useEffect } from 'react'
import './success.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
const Success = () => {
  const location = useLocation()
  const search = location.search
  const navigate = useNavigate()
  const params = new URLSearchParams(search)
  const payment_intent = params.get("payment_intent")

  useEffect(() => {
    const makeRequest = async()=>{
      try {
        await newRequest.put("/orders",{payment_intent})
        setTimeout(()=>{
          navigate('/orders')
        },5000)
      } catch (error) {
        console.log(error)
      }
    }
    makeRequest()
  }, [payment_intent])
  
  return (
    <div>
      Payment Successful. You are being redirected to the orders page. Please do not close the page.
    </div>
  )
}

export default Success