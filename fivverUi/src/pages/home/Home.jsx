import React, { useEffect } from 'react'
import './home.scss'
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/slide/Slide'
import { cards, projects } from '../../constants/constants'
import CatCard from '../../components/catCard/CatCard'
import Features from '../../components/features/Features'
import BusFeature from '../../components/businessFeatures/BusFeature'
import ProjectCard from '../../components/projectCard/ProjectCard'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  const accessToken = Cookies.get('accessToken')
  useEffect(() => {
    if (!accessToken) {
      localStorage.setItem("currentUser",null)
      navigate('/login')
    }
  }, [accessToken])
  
  return (
    <div className='home'>
     <Featured/>
     <TrustedBy/>
     <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} item={card} />
        ))}
      </Slide>
      <Features/>
      <BusFeature/>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} item={card} />
        ))}
      </Slide>
      <hr />
    </div>
  )
}

export default Home