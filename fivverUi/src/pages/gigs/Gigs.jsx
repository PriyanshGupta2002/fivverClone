import React, { useEffect, useState,useRef } from 'react'
import './gigs.scss'
import { useLocation } from 'react-router-dom'
import GigCard from '../../components/gigCard/GigCard'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const Gigs = () => {

  
  const {search} = useLocation()
  
  const searchQuery = decodeURIComponent(search)
  const [showMenu, setshowMenu] = useState(false)
  const [op, setop] = useState("sales")
  console.log(searchQuery)
  const minRef = useRef(null)
  const maxRef = useRef(null)

  const { isLoading, error, data,refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () => newRequest.get(`/gigs${searchQuery}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${op}`).then((res)=>{
      return res.data
    })
  })




  const resort=(type)=>{
    setop(type)
    setshowMenu(false)
  }
  useEffect(() => {
    refetch()
  }, [op])

  const apply=()=>{
    refetch()
  }

  return (
    <div className='gigs' >
      <div className="container">

        <span className="breadCrumbs">
          FIVERR &rarr; {name} &rarr;
        </span>
        <h1>{name}</h1>
        <p>Explore the boundary of art and techology with Fiverr&apos; {name}</p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="number"  placeholder='min' min="0" name="" id="" ref={minRef}/>
            <input type="number" placeholder='max' min="0" name="" id="" ref={maxRef} />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className='sortBy' >Sort by</span>
            <span className='sortType' >{op==="sales"?"Best Selling":"Newest"}</span>
            <img src="./img/down.png" alt="" onClick={()=>setshowMenu(prevState=>!prevState)}/>
           {showMenu && <div className="rightMenu">
             {op === "sales"?( <span onClick={()=>{resort("createdAt")}}>Newest</span>)
              :(<span onClick={()=>resort("sales")} >Best Selling</span>)}
            </div>
            }
          </div>
       
        </div>
      <div className="gig">
      {isLoading?"Loading..." : error ?"Something Went Wrong": data.map((gig)=>(
        <GigCard key={gig._id} item={gig} />
        ))}
        </div>


        </div>
    </div>
  )
}

export default Gigs