import {Router} from "express"
import { query,validationResult,matchedData,checkSchema} from "express-validator"
import mockUsers from '../utils/mockUsers.mjs'
import { createUserValidationSchema } from "../utils/validationSchemas.mjs"
import resolveIndexByUserId from "../utils/middleware.mjs"
const router=Router()
import session from "express-session"
import  User from "../mongoose/schemas/users.mjs"
import  hashPassword   from "../utils/helpers.mjs"
//router.use(Router)
// import pkg from '../mongoose/users.js';
// const { User } = pkg;

router.use(session(
    {   secret:"pavan_the_dev",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:60000*60,
    }}))
 router.get(
    "/api/users",
    (req,res)=>{

        console.log(req.sessionID)
        req.sessionStore.get(req.sessionID,(err,sessionData)=>{
            if(err){
                console.log(err)
                throw err
            }
            console.log(sessionData)
        })
        console.log("-------session")
        const result=validationResult(req)
        console.log(result)
        const{
            query:{filter,value},}=req

        if(!filter || !value) 
            return res.send(mockUsers)
        return res.send(mockUsers.filter((user)=>user[filter].includes(value)))
})

router.post('/api/auth',
checkSchema(createUserValidationSchema),
    async (req,res)=>{
        const result=validationResult(req)
        if(!result.isEmpty()) return res.send(result.array())
    const data=matchedData(req)
    const newUser=new User(data)
    try{
        const savedUser=await newUser.save()
        return res.sendStatus(201).send(savedUser)
    }catch(err){
         res.sendStatus(400)
    }
})

router.post('/api/users',
checkSchema(createUserValidationSchema),
    async (req,res)=>{
        
        const result=validationResult(req)
        if(!result.isEmpty()) return res.send(result.array())
        
    const data=matchedData(req)
    console.log(data)
    console.log("hahahaha")
    try{
        data.password=hashPassword(data.password)}
        catch(err){ console.log(err)}
    const newUser=new User(data)
    try{
        const savedUser=await newUser.save()
        res.sendStatus(201).send(savedUser)
    }catch(err){
        console.log(err)
         //res.send('ok')
    }
})




router.put("/api/users/:id",resolveIndexByUserId,(req,res)=>{
    const {body,finduserIndex}=req
    mockUsers[finduserIndex]={id:mockUsers[finduserIndex].id,...body };
    
    return res.sendStatus(200)
})

router.patch("/api/users/:id",resolveIndexByUserId,(req,res)=>{
    const {body,finduserIndex}=req
    mockUsers[finduserIndex]={id:mockUsers[finduserIndex].id ,...body }
    return res.sendStatus(200)
})

router.delete("/api/users/:id",resolveIndexByUserId,(req,res)=>{
    const { finduserIndex}=req;
    mockUsers.splice(finduserIndex,1);
    res.sendStatus(200)
})
router.get('/api/users/:id',resolveIndexByUserId,(req,res,next)=>{
    const {finduserIndex}=req
        const findUser=mockUsers[finduserIndex]
     if(!findUser) res.sendStatus(404)
     res.send(findUser)

})

export default router
