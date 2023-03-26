import React,{useState} from 'react'
import './login.scss'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const [formInfo,setFormInfo]=useState({
    username:"",
    password:""
  })
  const [error, setError] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const handleChange=(e)=>{
    setFormInfo(
      {...formInfo,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setisLoading(true)
    if (formInfo.username.trim().length<=0 && formInfo.password.trim().length<=0) {
      setisLoading(false)
      setError("Credentials are required")
      return
    }
    try {
     const res = await newRequest.post('/auth/login',formInfo)
      localStorage.setItem('currentUser',JSON.stringify(res.data))
      setFormInfo({...formInfo,username:"",password:""})
      setisLoading(false)
      navigate('/')
    } catch (error) {
      setisLoading(false)

      setError(error.response.data)
    }
  }
  return (
    <div className='login'>
      <div className="container">
        <form action="" onSubmit={handleSubmit}>
        <h1>Sign In</h1>
          <div className="formItem">
            <label htmlFor="">Username</label>
            <input type="text" onChange={handleChange}  name="username" value={formInfo.username}/>
          </div>
          <div className="formItem">
            <label htmlFor="">Password</label>
            <input type="password" onChange={handleChange} name="password" value={formInfo.password}/>
          </div>
          <button disabled={isLoading&&true}>
            {isLoading?"Logging You In...":'Login'}
          </button>
          {error && error}
        </form>
      </div>
    </div>  
  )
}

export default Login