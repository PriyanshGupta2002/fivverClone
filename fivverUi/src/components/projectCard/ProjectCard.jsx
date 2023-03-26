import React from 'react'
import './projectCard.scss'
import { Link } from 'react-router-dom'
const ProjectCard = ({item:{img,pp,cat,username}}) => {
  return (
    <Link to="/" className='link'>
        <div className="projectCard">
            <img src={img} alt={cat} />
            <div className="info">
                <img src={pp} alt="" />
                <div className="texts">
                    <h2>{cat}</h2>
                    <span>{username}</span>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProjectCard