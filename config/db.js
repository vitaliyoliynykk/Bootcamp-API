const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('here');
   const connection = await mongoose.connect(process.env.MONGO_URI, {
       useNewUrlParser: true,
       useCreateIndex: true,
       useFindAndModify: false,
       useUnifiedTopology: true
   });

   console.log(`MongoDB connected: ${connection.connection.host}`)
}

module.exports = connectDB;