import React from 'react'
import './BusFeature.scss'
import { busFeatures } from '../../constants/constants'
const BusFeature = () => {
  return (
    <div className='Busfeatures'>
        <div className="container">
            <div className="itemBus">
                <h1>fiverr <i>business</i></h1>
                <h1>A business solution designed for <i>teams</i></h1>
                <p>Upgrade to a curated experience packed with tools and benifits, dedicated to businesses</p>
                <div className='titles'>
                {busFeatures.map((feature,idx)=>(
                    <div className='title' key={idx}>
                        <img src="./img/check.png" alt="" />
                        <p>{feature.title}</p>
                    </div>
                    ))}
                </div>
                <button className='btn'>
                    Explore Fiverr Business
                </button>
            </div>

            <div className="item-r">
                <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png" alt="fivver people business image" />
            </div>
        </div>
    </div>
  )
}

export default BusFeature