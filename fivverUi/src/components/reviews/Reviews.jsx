import React, { useEffect, useState } from 'react'
import './reviews.scss'
import Review from '../reviewBox/Review'
import newRequest from '../../utils/newRequest'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
const Reviews = ({id:gigId}) => {
    const {isSeller,_id:currentUserId}=JSON.parse(localStorage.getItem("currentUser"))
     const [hasUserRated, setHasUserRated] = useState(false)
    const queryClient = useQueryClient()
    const { isLoading, error, data,refetch } = useQuery({
        queryKey: ['reviews',gigId],
        queryFn: () => newRequest.get(`/reviews/${gigId}`).then((res) => {
            return res.data;
          }),
        })
        const [show, setshow] = useState(false)
        const [comment,setComment] = useState({
            desc:"",
            star:+1
        })

        const handleChange=(e)=>{
            setComment((prev)=>{
                return {...prev,[e.target.name]:e.target.value}
            })
        }

        const mutation = useMutation({
          mutationFn: (comment) => {
            return newRequest.post("reviews/createReview/",comment)
          },
          onSuccess:()=>{queryClient.invalidateQueries(['reviews'])}
        })
        const handleComment=async()=>{
            // await newRequest.post("reviews/createReview/",{...comment,gigId:gigId})
            mutation.mutate({...comment,gigId})
            setshow(false)

        }
        const user = !!data?.find((d)=>(d.userId===currentUserId))
        useEffect(() => {
          if (user) {
            setHasUserRated(true)
          }
        }, [user])
       
        
  return (
    <div className="reviews">
        <div className='top'>
         { isLoading ?"Loading....":error?"Something Went Wrong":<><h2>Reviews</h2>
            {data.length===0? <h1 className='noreview'>No Reviews Yet! Be the first one to rate the gig</h1> :data?.map((item)=>(
                <Review key={item._id} refetch={refetch} item={item} setHasUserRated={setHasUserRated}/>
                ))} </> }
        </div> 
        
      {!isSeller  && !hasUserRated && <div className='bottom'>
        {!show&&<button onClick={()=>setshow(true)} className='write'>Wanna to write a review?</button>}
        {show && <> 
        <div className='comment'>
        <input type="text" name="desc"  onChange={handleChange} />
        <button onClick={handleComment}>Comment</button>
        </div>
        <div className='rate'>
        <label htmlFor="review">Rate the gig</label>
            <select id="review" name='star' value={comment.star} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
             {Array(+comment.star)
                .fill()
                .map((_, i) => (
                  <img key={i} src="/img/star.png" alt="image" />
                ))}
        </div>
        
        </>}
        </div>}

         </div>
  )
}

export default Reviews