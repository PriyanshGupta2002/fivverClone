import React from 'react'
import './review.scss'
import newRequest from '../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';
const Review = ({item:{desc,star,userId,_id},refetch,setHasUserRated}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    })
    
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const handleDelete=async(id)=>{
      await newRequest.delete(`reviews/deleteReview/${id}`)
      setHasUserRated(false)
      refetch()
    }

    
  return (
    <div className="itemReview">
    {isLoading?"Loading...":error?"Something went wrong":<div className="user">
      <img src="/img/noavatar.png" alt="" className='pp' />
    <div className="info">
      <span>{data?.username}</span>
      <div className="country">
          <img
          src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
            alt=""
          />
        <span>{data?.country}</span>
      </div>
      </div>
      {!currentUser.isSeller&&currentUser._id===userId&&<img src="/img/delete.png" alt=""  className='delete' onClick={()=>handleDelete(_id)}/>}
    </div>}
    <div className="stars">
    {Array(star)
      .fill()
      .map((_, i) => (
        <img key={i} src="/img/star.png" alt="image"  />
      ))}
    <span>{star}</span>
  </div>
  <p>
     {desc}
    </p>
    <div className="helpful">
      <span>Helpful?</span>
      <img src="/img/like.png" alt="" />
      <span>Yes</span>
      <img src="/img/dislike.png" alt="" />
      <span>No</span>
    </div>
    <hr />
  </div>
  )
}

export default Review