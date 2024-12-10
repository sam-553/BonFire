const { Schema, model } = require('../connection')

const mySchema = new Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    profile: String,
    avatar: { type: String, default: 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = model('user', mySchema)