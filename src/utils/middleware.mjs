import mockUsers from "./mockUsers.mjs";

const resolveIndexByUserId=(req,res,next)=>{
    const {body,params:{id}}=req;
    const parsedId=parseInt(id);
    if(isNaN(parsedId))  res.sendStatus(400);

    const finduserIndex=mockUsers.findIndex(
        (user)=> user.id===parsedId)
    if(finduserIndex===-1)  res.sendStatus(404)
    req.finduserIndex=finduserIndex
    //mockUsers[finduserIndex]={id:parsedId,...body };
    //next()
    next()
}
export default resolveIndexByUserId