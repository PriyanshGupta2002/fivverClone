import React from "react";
import "./gig.scss";
import Slider from "infinite-react-carousel";
import {useNavigate, useParams } from "react-router-dom";
import { gigBox } from "../../constants/constants";

import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";
const Gig = () => {


  const { id } = useParams();
  const navigate = useNavigate()

    const { isLoading, error, data } = useQuery({
      queryKey: [id],
      queryFn: () => newRequest.get(`/gigs/singleGig/${id}`).then((res) => {
        return res.data;
      }),
    })
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const userId = data?.userId

    const { isLoading:isLoadingUser, error:userError, data:userData } = useQuery({
      queryKey: [userId],
      queryFn: () => newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    })
    const star = Math.round(data?.totalStars/data?.starNumber)

    const gigbox=gigBox(userData?.country)

  return (
    <div className="gig">
    {isLoading ?'Loading...': error?"Error":<div className="container">
        <div className="left">
          <span className="breadCrumbs">FIVERR &rarr; AI Artists &rarr;</span>
          <h1>{data?.title}</h1>
          {isLoadingUser?"Loading...":userError?"Something went wrong":<div className="user">
            <img src="/img/noavatar.png" alt="" className="pp" />
            <span>{userData?.username}</span>
            <div className="stars">
              {Array(isNaN(star)?1:star)
                .fill()
                .map((_, i) => (
                  <img key={i} src="/img/star.png" alt="image" />
                ))}
              <span>{isNaN(star)?0:star}</span>
            </div>
          </div>}
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
          {data?.images.map((img,idx)=>(
            <img src={img} alt="" key={idx} />
          ))}
          </Slider>
          <h2>{data?.title}</h2>
          <p>
          {data?.desc}
          </p>
          <div className="seller">
            <h2>About the seller</h2>
            <div className="userinfo">
              <img src={userData?.img||`/img/noavatar.png`} alt="" />
              <div className="info">
                <span>{userData?.username}</span>
                <div className="stars">
                {Array(isNaN(star)?1:star)
                .fill()
                .map((_, i) => (
                  <img key={i} src="/img/star.png" alt="image" />
                ))}
              <span>{isNaN(star)?0:star}</span>
                </div>
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                {gigbox.map((box,idx)=>(
                  <div key={idx} className="item">
                    <span className="title">{box.title}</span>
                    <span className="desc">{box.desc}</span>
                  </div>
                ))}
              </div>
              <hr />
              <p>{userData?.desc || "No Description"}</p>
            </div>
          </div>
          <Reviews id={id}/>
        </div>
        <div className="right">
          <div className="box">
            <div className="boxTitle">
              <span>{data?.shortTitle}</span>
              <span className="price">₹{data?.price}</span>
            </div>
            <div className="desc">
                    <p>{data?.shortDesc}</p>
            </div>
            <div className="services">
                    <div className="time">
                      <img src="/img/clock.png" alt="" />
                      <span>{data?.deliveryTime} Days Delivery</span>
                    </div>
                    <div className="rev">
                      <img src="/img/recycle.png" alt="" />
                      <span>{data?.revisionNumber} Revisions</span>
                    </div>
            </div>
            <div className="gigFeatures">
                      {data?.features.map((feature,idx)=>(
                        <div className="feature" key={idx}>
                          <img src="/img/greencheck.png" alt="" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                   
                  {currentUser._id !== userId &&  <button onClick={()=>navigate(`/pay/${id}`)} >
                      Continue
                    </button>}
                 
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Gig;
