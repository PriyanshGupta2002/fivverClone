import React, { useEffect, useState } from 'react'
import './message.scss'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { getUserInfo } from '../../utils/userInfo'
import MessageCard from '../../components/messageCard/MessageCard'

const Message = () => {
  const {id} = useParams()
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [desc, setDesc] = useState("")
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages",id],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => {
      return res.data;
    }),
  })

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages/createMessage/${id}`,message)
    },
    onSuccess:()=>{queryClient.invalidateQueries(['messages'])}
  })



  const handleSubmit=(e)=>{
    e.preventDefault()
    mutation.mutate({desc})
    setDesc("")
  } 

  
  return (
    <div className='message'>
      <div className="container">

        <span className='breadcrumbs'>
          <Link to="/messages" className='link'>MESSAGES &gt;</Link> John Doe &gt;
        </span>
       {isLoading?"Loading...":error?"Something went wrong":<div className="messages">

       {data.length===0 ?<h1>Write Your Message to start a conversation...</h1>:data.map((message)=>(
        <MessageCard key={message._id} item={message} currentUserId={currentUser._id}/>
       ))}
         
        </div>}
          <hr />
          
        <form className="write" onSubmit={handleSubmit}>
          <textarea name="" onChange={(e)=>setDesc(e.target.value)} value={desc} placeholder='Write a message' id="" cols="10" rows="10" ></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Message