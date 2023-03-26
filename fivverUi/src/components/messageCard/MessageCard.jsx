import React from 'react'
import './messageCard.scss'
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
const MessageCard = ({item:{userId,desc},currentUserId}) => {

      
const { isLoading, error, data } = useQuery({
  queryKey: [userId],
  queryFn: () => newRequest.get(`/users/${userId}`).then((res) => {
    return res.data;
  }),
})

  return (
    <div className={userId===currentUserId?'item owner':'item'}>
   {isLoading?"Loading...":error?"Something went wrong":<img src={data?.img || '/img/noavatar.png'} alt="" />}
     <p>{desc} </p>
     </div>
  )
}

export default MessageCard