import React from 'react'
import './mygigs.scss'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../../utils/getCurrentUser'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
const MyGigs = () => {
  const currentUser = getCurrentUser()
  const queryClient = useQueryClient()
  const { isLoading, error, data:mygigs } = useQuery({
    queryKey: ['gigs'],
    queryFn: () => newRequest.get(`/gigs?userId=${currentUser._id}`).then((res)=>{
      return res.data
    })
  })

  const mutation = useMutation({
    mutationFn: (gigId) => {
      return newRequest.delete(`gigs/deleteGig/${gigId}`)
    },
    onSuccess:()=>{queryClient.invalidateQueries(['gigs'])}
  })

  const handleDelete=(gigId)=>{
    mutation.mutate(gigId)
  }

  return (
    <div className='mygigs'>
    {isLoading?"Loading...":error?"Something went wrong":<div className="container">


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
            <th>Action</th>
          </tr>
        
            {mygigs.map((mgig,idx)=>(
              <tr key={idx}>
              <td>
                <img src={mgig.cover} alt="" />
              </td>
              <td>{mgig.title}</td>
              <td>{mgig.price}</td>
              {/* <td>{mgig.orders}</td> */}
              <td>
                <img className='action' src="/img/delete.png" alt="" role='button' onClick={()=>handleDelete(mgig._id)}/>
              </td>
              </tr>
            ))}
            
        
        </table>

      </div>}
    </div>
  )
}

export default MyGigs