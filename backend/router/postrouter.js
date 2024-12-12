const express = require('express');
const Model=require('../model/postmodel')
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();


const router=express.Router()

router.post('/add', (req, res) => {

    new Model(req.body).save()
        .then((result) => {
           
            
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);

            res.status(500).json(err)
        });
})
router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            if(err==11000){
                res.status(500).json(err)
            
            }
        });
})
router.get('/getpost',verifyToken, (req, res) => {
    const{_id}=req.post;
    Model.find()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err);
            if(err==11000){
                res.status(500).json(err)
            
            }
        });
})
router.get('getbyid', (req, res) => {
    Model.findById()
    .then((result) => {
       res.status(200).json(result) 
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)   
    }); 
})
router.get('/update', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    }); 
})
router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
});


module.exports=router