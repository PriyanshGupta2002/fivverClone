import React from 'react'
import './trustedby.scss'
import { trustedByImg } from '../../constants/constants'
const TrustedBy = () => {
  return (
    <div className='trustedBy'>
            <p>Trusted by:</p>
           {trustedByImg.map((item,idx)=>(
            <img src={item.src} alt={item.name} key={idx} className='t-img'/>
           ))}
    </div>
  )
}

export default TrustedBy