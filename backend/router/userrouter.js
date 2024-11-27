const express = require('express');
const Model = require('../model/usermodel')

const router = express.Router();

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
                res.status(500).json({message:'email already registered'})
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
    Model.findByIdAndUpdate()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        
        res.status(500).json(err)
    });
   
})
router.get('/delete', (req, res) => {
    Model.findByIdAndDelete()
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router