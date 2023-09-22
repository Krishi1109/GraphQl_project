const  mongoose = require("mongoose")

console.log(process.env.MONGO_URI)

const connectDB = async ()=> {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB