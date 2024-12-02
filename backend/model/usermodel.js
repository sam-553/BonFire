
const { Schema, model } = require('../connection')



const mySchema = new Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    profile:String,
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('user', mySchema)