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
    Model.findById(_id)
           .then((result) => {
               res.status(200).json(result)
           }).catch((err) => {
               res.status(500).json(err)
           });
})
router.get('getbyid/:id', (req, res) => {
    Model.findById()
    .then((result) => {
       res.status(200).json(result) 
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)   
    }); 
})
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err)
    }); 
})
router.post('/like/:id', async (req, res) => {
    try {
        const post = await Model.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.likes += 1;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.post('/share/:id', async (req, res) => {
    try {
        const post = await Model.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.shares += 1;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.post('/comment/:id', async (req, res) => {
    try {
        const post = await Model.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.comments += 1;
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.get('/comment/:id', async (req, res) => {
    try {
        const post = await Model.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post.comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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