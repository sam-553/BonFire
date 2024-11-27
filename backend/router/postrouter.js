const express = require('express');

const router=express.Router()

router.get('/add',(req,res)=>{
    res.send('response from post add')
})
router.get('/getall',(req,res)=>{
    res.send('response from post getall')
})
router.get('/getbyid',(req,res)=>{
    res.send('response from post getbyid')
})
router.get('/update',(req,res)=>{
    res.send('response from post update')
})
router.get('/delete',(req,res)=>{
    res.send('response from post delete')
})
module.exports=router