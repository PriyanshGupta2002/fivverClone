import React from 'react'
import './mygigs.scss'
import { Link } from 'react-router-dom'
import { mygigs } from '../../constants/constants'
const MyGigs = () => {
  return (
    <div className='mygigs'>
      <div className="container">


        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add" className='link'>
            <button>
            Add New Gig
            </button>
          </Link>
        </div>

        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Orders</th>
            <th>Action</th>
          </tr>
        
            {mygigs.map((mgig,idx)=>(
              <tr key={idx}>
              <td>
                <img src={mgig.img} alt="" />
              </td>
              <td>{mgig.title}</td>
              <td>{mgig.price}</td>
              <td>{mgig.orders}</td>
              <td>
                <img className='action' src="/img/delete.png" alt=""/>
              </td>
              </tr>
            ))}
            
        
        </table>

      </div>
    </div>
  )
}

export default MyGigs