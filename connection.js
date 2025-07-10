const mongoose = require('mongoose');
require('dotenv').config();


const url = process.env.MONGO_URL;

if (!url) {
    console.error('❌ MONGO_URL not defined in environment variables.');
    process.exit(1);
}

mongoose.connect(url, {
    
})
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
});

module.exports = mongoose;
