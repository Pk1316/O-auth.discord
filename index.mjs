import express, { Router, request } from "express"
//import Router from 'express'
import routes from './src/routes/index.mjs'
import cookieParser from "cookie-parser"
import session from "express-session"
import mockUsers from "./src/utils/mockUsers.mjs"
import passport from "passport"
import mongoose from "mongoose"
//import localStrategy from "./src/stratagies/local-strategy.mjs"
import MongoStore from "connect-mongo"
import './src/stratagies/discord-strategy.mjs'
const app=express() 

//const router=Router()
mongoose.connect('mongodb://localhost/exprs').then(()=>console.log('connected'))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(cookieParser("hello_man"))
app.use(routes)
app.use(session({
    secret:"pavan_the_dev",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60,
    },
    store: MongoStore.create({
        client:mongoose.connection.getClient(),
    })
})
)
app.use(passport.initialize())
app.use(passport.session())
app.get('/',(req,res)=>{
    req.session.visited=true
    res.send(mockUsers)
    console.log('Base Url')
    res.cookie("test", "hell0",{maxAge:30000,signed:true})
    //res.send("test")
    
});
app.get("/api/auth/discord",passport.authenticate("discord"))
app.get("api/auth/discord/redirect",passport.authenticate('discord',{failureRedirect: '/'}),(req,res)=>{
    console.log(req.session)
    console.log(req.user)
    res.sendStatus(200).send(req.user)
})
app.post("/api/auth/",(req,res)=>{
    const {
        body:{username,password},
    }=req
    const findUser=mockUsers.find((user)=>user.username===username)
    if(!findUser || findUser.password!==password) return res.status(401).send({msg:"not valid"})
    if(findUser.password!==password)
        return res.status(401).send({msg:"not valid"}) 
    req.session.user=findUser
})
app.use(passport.initialize())
app.use(passport.session())

app.get('/api/auth',
passport.authenticate('local'),
(req,res)=>{
    res.sendStatus(202)
})

app.get('/api/auth/status',(req,res)=>{
    console.log(req.user);
    console.log(req.session)
    return req.user?res.send(req.user):res.sendStatus(401)
})

app.post('/api/auth/logout',(req,res)=>{
    if(!req.user) return res.sendStatus(404)
        req.logout((err)=>{
    if(err) return res.sendStatus(400)
    res.send(200)
    })
})


app.listen(8000) 
