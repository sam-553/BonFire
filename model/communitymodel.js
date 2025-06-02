
const { Schema, model } = require('../connection')


const mySchema = new Schema({
    title: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
})
module.exports = model('community', mySchema)