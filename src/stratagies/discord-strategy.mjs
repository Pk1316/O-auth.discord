import passport from 'passport'
import { Strategy } from 'passport-discord'
import{DiscordUser} from "../mongoose/discord-user.mjs"

passport.serializeUser((user,data)=>{
    console.log(user)
    document(null,user.id)
})
export default passport.use(
    new Strategy({
        clientID:"1245247016758546474",
        clientSecret:"64cc6bc43d58c2ab7a1cbecdcf33a0c0b4f4d9b9983f742f17426a0df0431b71",
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