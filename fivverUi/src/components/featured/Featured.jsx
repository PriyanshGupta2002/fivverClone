import React from 'react'
import './featured.scss'
import { popular } from '../../constants/constants'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Featured = () => {
    const [search, setsearch] = useState("")
    const navigate = useNavigate();
    const handleSearch = (e)=>{
        e.preventDefault()
        navigate(`/gigs?search=${search.trim().toLowerCase()}`)
    }
  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the perfect <i>freelance</i> services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="./img/search.png" alt="" />
                        <input type="text" placeholder='Try building mobile app' value={search} onChange={(e)=>setsearch(e.target.value)} />
                    </div>
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="popular">
                    <span>
                        Popular:
                    </span>
                   {popular.map((pop,idx)=>(
                    <button key={idx}>
                        {pop.name}
                    </button>
                   ))}
                </div>
            </div>
            <div className="right">
                <img src="./img/man.png" alt="Man" />
            </div>
        </div>
    </div>
  )
}

export default Featured