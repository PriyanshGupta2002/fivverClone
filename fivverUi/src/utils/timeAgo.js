import moment from "moment";
export const getTimeAgo = (timestamp)=>{
    return moment(timestamp).fromNow()
}