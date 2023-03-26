import axios from "axios";
const newRequest = axios.create({
   baseURL:"http://localhost/api/",
   withCredentials:true
})
export default newRequest