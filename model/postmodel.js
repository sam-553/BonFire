
const { Schema, model } = require('../connection')


const mySchema = new Schema({

    caption: { type: String, required: true },
    communityName: { type: String, required: true, default: "" },
    image: { type: String, required: true },
    likes: {
        type: Number,
        default: 0, // Number of likes
      },
      shares: {
        type: Number,
        default: 0, // Number of shares
      },
    comments:{ type: String },
   
})
module.exports = model('/post', mySchema)