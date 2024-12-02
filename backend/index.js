const express = require('express');
//import user router
const userrouter = require('./router/userrouter')
const postrouter=require('./router/postrouter')
const profilerouter=require('./router/profilerouter')
const communityrouter=require('./router/communityrouter')
const cors=require('cors');
const app = express();
const port = 5000;

//middleware
app.use(cors({
    origin:('http://localhost:3000')
}));
app.use(express.json());
app.use('/user', userrouter)
app.use('/post',postrouter)
app.use('/profile',profilerouter)
app.use('/community',communityrouter)

app.get('/', (req, res) => {
    res.send('response from express')
})


//server started
app.listen(port, () => {
    console.log('server started');
})