
const {schema,model}=require('../connection')


const mySchema=new schema({
    title:{type:String,required:true},
    caption:{type:String,required:true},
    image:{type:String,required:true},
    likes:{type:String,required:true},
    shares:String,
    postedby:{type:String,required:true},
    createdAt:{type:Date,default:Date.now}
})
module.exports=model('/post',myschema)