import React from 'react'
import './messages.scss'
// import { myMessages } from '../../constants/constants'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { getTimeAgo } from '../../utils/timeAgo'
const Messages = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const { isLoading, error, data:myMessages } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => newRequest.get("/conversations").then((res) => {
      return res.data;
    }),
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`)
    },
    onSuccess:()=>{queryClient.invalidateQueries(['conversations'])}
  })

  const handleRead=(id)=>{
    mutation.mutate(id)
  }
  return (
    <div className='messages'>
      <div className="container">
<div className="title">
  <h1>Messages</h1>
</div>

<table>
  <tr>
    <th>{currentUser?.isSeller?'Buyer':'Seller'}</th>
    <th>Last Message</th>
    <th>Date</th>
    <th>Action</th>
  </tr>
    {myMessages?.map((myMessage,idx)=>(
      <tr  key={idx} className={((currentUser.isSeller && !myMessage?.readBySeller) || (!currentUser.isSeller&&!myMessage?.readByBuyer) )&&'bgcol'}>
      <td>
        {currentUser.isSeller? myMessage?.buyerId:myMessage?.sellerId}
      </td>
      <td className={((currentUser.isSeller && !myMessage?.readBySeller)||(!currentUser.isSeller &&!myMessage?.readByBuyer) )&&'seen'}> <Link to={`/message/${myMessage?.id}`} className='link'>{myMessage?.lastMessage?.substring(0,100)||"No Last Message"}...</Link></td>
      <td>{getTimeAgo(myMessage?.updatedAt)}</td>
      <td>{((currentUser.isSeller && !myMessage?.readBySeller) ||(!currentUser.isSeller && !myMessage?.readByBuyer) )&& <button onClick={()=>handleRead(myMessage?.id)}>Mark as Read</button> }</td>
      <td>
   
      </td>
      </tr>
    ))}

</table>

</div>
    </div>
  )
}

export default Messages