import React from 'react'
import './gigCard.scss'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const GigCard = ({item:{cover,_id,desc,totalStars,price,userId,starNumber}}) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [userId],
        queryFn: () => newRequest.get(`/users/${userId}`).then((res) => {
            return res.data;
          }),
        })

        const rating = Math.round(totalStars/starNumber)
    
  return (
    <Link to={`/gig/${_id}`} className='link'>
    <div className='gigCard'>
        <img src={cover} alt="" />
        <div className="info">
            {isLoading ?"loading":error?"Error":<div className="user">
                <img src={data.img || '/img/noavatar.png'} alt="" />
                <span>{data.username}</span>
            </div>}

            <p>{desc}</p>
            <div className="star">
                <img src="./img/star.png" alt="" />
                <span>{isNaN(rating)?0:rating}</span>
            </div>
        </div>
        <hr />
        <div className="details">
            <img src="./img/heart.png" alt="" />
            <div className="price">
            <span>
                STARTING AT
            </span>
            <h2>₹{price}</h2>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default GigCard