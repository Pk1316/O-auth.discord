import passport from "passport";
import { Strategy } from "passport-local";
import User from "../mongoose/schemas/users.mjs";

passport.serializeUser((user,done)=>{ 
    console.log(user)
    done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    console.log(id)
     try{
            const findUser=await User.findById(id)
            if(!findUser) throw new Error("invalid user")
            done(null,findUser)
     }catch(err){
            done(err,null)
     }
    
})
export default passport.use(
    new Strategy(async(username,password,done)=>{
        try{
            const findUser=await User.findOne({username})
            if(!findUser) throw new Error("user not found")
                 if(findUser.password!==password) throw new Error("bad credintials")
                done(null,findUser)
        }catch(err){
            done(err,null)
        }
    })
)