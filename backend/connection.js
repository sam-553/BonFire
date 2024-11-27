const mongoose = require('mongoose');

const url="mongodb+srv://samdb:sam553@cluster0.hfmcl.mongodb.net/Webapp?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url)
.then((result) => {
    console.log('db connected');
    
}).catch((err) => {
    console.log(err);
    
});
module.exports=mongoose