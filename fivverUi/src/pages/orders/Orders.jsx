import React from 'react'
import './orders.scss'
import { myOrders } from '../../constants/constants'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import Order from '../../components/order/Order'
const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  

  const { isLoading, error, data:myOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get("/orders").then((res) => {
      return res.data;
    }),
  })

  return (
    <div className='orders'>
     {isLoading ?"Loading...":error?"Something went wrong":<div className="container">
<div className="title">
  <h1>Orders</h1>
</div>

<table>
    <thead>

  <tr>
    <th>Image</th>
    <th>Title</th>
    <th>Price</th>
    <th>{currentUser?.isSeller?'Buyer':'Seller'}</th>
    <th>Action</th>
  </tr>
    </thead>

      {myOrders?.map((mOrder,idx)=>(
        <Order key={idx} mOrder={mOrder} isSeller={currentUser.isSeller} className="maindata"/>
        ))}
 
    

</table>

</div>}
    </div>
  )
}

export default Orders