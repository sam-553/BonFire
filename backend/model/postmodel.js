
const { Schema, model } = require('../connection')


const mySchema = new Schema({

    caption: { type: String, required: true },
    communityName: { type: String, required: true, default: "" },
    image: { type: String, required: true },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comment:{ type: String, default: 0 },
    postedby: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})
module.exports = model('/post', mySchema)