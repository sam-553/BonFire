const express = require('express');
//import user router
const userrouter = require('./router/userrouter')
const postrouter=require('./router/postrouter')

const app = express();
const port = 5000;

//middleware
app.use(express.json());
app.use('/user', userrouter)
app.use('/post',postrouter)

app.get('/', (req, res) => {
    res.send('response from express')
})


//server started
app.listen(port, () => {
    console.log('server started');
})