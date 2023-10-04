const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8000
const MONGO_DB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGO_DB_URI


module.exports = {
    PORT,
    MONGO_DB_URI
}