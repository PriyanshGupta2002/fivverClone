import React, { useEffect, useState } from 'react'
import './navbar.scss'
import { subLinks } from '../../constants/constants'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest'
const Navbar = () => {
    const [active, setActive] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const[currentUser,setCurrentUser] = useState({})
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const isActive=()=>{
        window.scrollY>0?setActive(true):setActive(false)
    }
    useEffect(() => {
        if(localStorage.getItem('currentUser')){
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
        }
        window.addEventListener('scroll',isActive)
        pathname!=='/'?setActive(true):setActive(false)
        return ()=>{
            window.removeEventListener('scroll',isActive)
        }
    }, [pathname,localStorage.getItem('currentUser')])

    const handleLogout=async()=>{
        try {
            await newRequest.get('/auth/logout')
            localStorage.removeItem('currentUser')
            localStorage.setItem("currentUser",null)
            navigate('/')
        } catch (error) {
                console.log(error)
        }
    }
    
  return (
    <div className={active?'navbar active':'navbar'}>
        <div className="container">
            <div className="logo">
                <Link to='/' className='link' >
                <span className='text'>fiverr</span>
                </Link>
                <span className='dot'>.</span>
            </div>
            <div className="links">
                <span>Fiverr Business</span>
                <span>Explore</span>
                <span>English</span>
                {!currentUser && <Link className='link' to="/login"><span>Sign in</span></Link>}
                {!currentUser?.isSeller && <span>Become a seller</span>}
                {!currentUser && <button className={active?'btn active':'btn'} onClick={()=>navigate('/register')}>
                    Join
                </button>}
                {currentUser && 
                    <div className='user' onClick={()=>setShowMenu(prevState=>!prevState)} >
                        <img src={currentUser?.img ||"/img/noavatar.png"} alt={currentUser.username} />
                        <span>
                            {currentUser?.username}
                        </span>
                        {showMenu && <div className="options">
                            {currentUser?.isSeller && (
                                <>
                                <Link to="/my-gigs"  className='link'>
                                    Gigs
                                </Link>

                                <Link to="/add" className='link'>
                                    Add New Gig
                                </Link>
                                </>
                            )}
                            <Link to="/orders" className='link'>Orders</Link>
                            <Link to="/messages" className='link'>Messages</Link>
                            <Link className='link' onClick={handleLogout}>Logout</Link>
                        </div>}
                    </div>
                }
            </div>
        </div>
        {active &&( <>
             <hr />
             <div className="menu">
                {subLinks.map((sub,idx)=>(
                    <Link to={sub.to} key={idx} className='link'>
                        {sub.name}
                    </Link>
                ))}
             </div>
             <hr />
        </>) }
    </div>
  )
}

export default Navbar