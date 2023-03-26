import React from 'react'
import './featured.scss'
import { popular } from '../../constants/constants'
const Featured = () => {
  return (
    <div className='featured'>
        <div className="container">
            <div className="left">
                <h1>Find the perfect <i>freelance</i> services for your business</h1>
                <div className="search">
                    <div className="searchInput">
                        <img src="./img/search.png" alt="" />
                        <input type="text" placeholder='Try building mobile app' />
                    </div>
                    <button>Search</button>
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