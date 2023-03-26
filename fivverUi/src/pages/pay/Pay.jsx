import React from 'react'
import './pay.scss'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import CheckoutForm from '../../components/checkoutForm/CheckoutForm';
const stripePromise = loadStripe("pk_test_51LqLqVSAc9lsj9FOrXb7lnU0rpWp4V9VAg3e0k2CNYpWTr8wEALCc0vHplnyWabbWVJvMVmt0K0PaZSzFjX1inFa00RTWbu9WO");
const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const {id} = useParams()

    useEffect(() => {
        const makeRequest = async()=>{
            try {
                const res = await newRequest.post(`/orders/create-payment-intent/${id}`)
                setClientSecret(res?.data?.clientSecret)
            } catch (error) {
                console.log(error)
            }
        }
        makeRequest()
    }, [id]);
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };
    console.log(clientSecret)
  return (
    <div className='pay'>
         {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </div>
  )
}

export default Pay