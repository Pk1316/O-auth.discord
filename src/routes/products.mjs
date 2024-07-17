import {Router} from "express"


const router =Router()

router.get('/api/products',(req,res)=>{
    res.send([
        {id:'p1',cost:1000},
        {id:'p2',cost:'2312'}
    ]);
})

export default router