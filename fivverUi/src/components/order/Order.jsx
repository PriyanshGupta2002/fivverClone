import React from 'react'
import './order.scss'
import newRequest from '../../utils/newRequest'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
const Order = ({mOrder,isSeller}) => {
      const navigate = useNavigate()
      const currentUser = JSON.parse(localStorage.getItem("currentUser"))
      const userId =  isSeller?mOrder?.buyerId:mOrder?.sellerId
      const { isLoading:userLoading, error:userError, data:userInfo } = useQuery({
        queryKey: [userId],
        queryFn: () => newRequest.get(`/users/${userId}`).then((res) => {
          return res.data;
        }),
      })


      const handleConversation =async (order)=>{
        const sellerId = order?.sellerId
        const buyerId  = order?.buyerId
        const id = sellerId+buyerId
        try {
        const res = await newRequest.get(`/conversations/single/${id}`)
        navigate(`/message/${res.data.id}`)
        }
        catch (error) {
          if (error.response.status===404) {
             const {data}= await newRequest.post("/conversations/create",{to:currentUser?.isSeller ? buyerId:sellerId})
             navigate(`/message/${data.id}`)
          }
        }
      }
     
  return (
    <tr className='orderTr'>
    <td>
        <img src={mOrder?.image} alt="" />
      </td>
      <td>{mOrder?.title}</td>
      <td>{mOrder?.price}</td>
      <td>{userLoading?"Loading...":userError?"Something went wrong":userInfo?.username}</td>
      <td>
        <img className='action' src="/img/message.png" alt="" onClick={()=>handleConversation(mOrder)}/>
      </td>
      </tr>
  )
}

export default Order