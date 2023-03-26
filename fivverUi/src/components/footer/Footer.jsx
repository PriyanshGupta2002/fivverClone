import React from 'react'
import './footer.scss'
import { footerLinks } from '../../constants/constants'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          {footerLinks.map((fLink,idx)=>(
            <div key={idx} className='footlink'>
              <h1 className='headTitle'>{fLink.headTitle}</h1>
              {fLink.in.map((inLink,idx)=>(
                <p key={idx}>{inLink.title}</p>
                ))}
            </div>
          ))}
          </div>
          <hr />
          <div className="bottom">
            <div className="left">
              <h1>fiverr</h1>
              <p>© Fiverr International Ltd. 2023</p>
            </div>
            <div className="right">

              <div className="socials">
                <Link to="/">
                  <img src="/img/facebook.png" alt="" />
                </Link>
                <Link to="/">
                  <img src="/img/linkedin.png" alt="" />
                </Link>
                <Link to="/">
                  <img src="/img/pinterest.png" alt="" />
                </Link>
                <Link to="/">
                  <img src="/img/instagram.png" alt="" />
                </Link>
                <Link to="/">
                  <img src="/img/twitter.png" alt="" />
                </Link>
              </div>

              <div className='lang'>
                <img src="https://img.icons8.com/ios/50/null/geography--v1.png"/>
                <span>English</span>
              </div>

              <div className="currency">
                <span>₹</span>
                <span>INR</span>
              </div>

              <img src="/img/accessibility.png" alt="" className='access' />

            </div>
          </div>
      </div>
    </div>
  )
}

export default Footer