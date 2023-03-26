import newRequest from "./newRequest"

export const getUserInfo=async(id)=>{
    const userInfo = await newRequest.get(`/users/${id}`)
    return userInfo?.data
}