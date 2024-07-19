import passport from 'passport'
import { Strategy } from 'passport-discord'
import{DiscordUser} from "../mongoose/discord-user.mjs"
import dotenv from 'dotenv'
dotenv.config();
passport.serializeUser((user,data)=>{
    console.log(user)
    document(null,user.id)
})
export default passport.use(
    new Strategy({
        clientID:process.env.clientID,
        clientSecret:process.env.clientSecret,
        callbackURL:"http://localhost:8000/api/auth/discord/redirect",
        scope:["identify","guilds"],
    },
    async(aceessToken,refreshToken,profile,done)=>{
        let findUser
        try{
            findUser=await DiscordUser.findOne({discordId:profile.id})
        }catch(err){
           // console.log(err)
            return done(err,null)
        }
    }
)
)