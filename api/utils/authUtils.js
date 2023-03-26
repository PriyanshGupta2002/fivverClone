import bcrypt from 'bcryptjs'

export const hashPass=(originalPass)=>{
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(originalPass, salt);
}
export const verifyPass=(hash,userPass)=>{
    if(bcrypt.compareSync(userPass, hash)){
        return true
    }
    return false
}