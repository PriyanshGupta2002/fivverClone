import React from 'react'
import { features } from '../../constants/constants'
import './features.scss'
const Features = () => {
  return (
    <div className='features'>
        <div className="container">
            <div className="itemFeatures">
                <h1>
                    A whole world of freelance talent at your fingertips.
                </h1>
                {features.map((feature,idx)=>(
                    <div key={idx} className='item-feature'>
                    <div className="title">
                        <img src="./img/check.png" alt="" />
                        {feature.title}
                    </div>
                    <p>
                        {feature.desc}
                    </p>
                    </div>
                ))}
            </div>
            <div className="item-right">
            <video controls >
             <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7" type="video/mp4"/>
            </video>
            </div>
        </div>
    </div>
  )
}

export default Features