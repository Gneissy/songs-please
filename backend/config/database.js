const mongoose = require ("mongoose");

const connectDB = async function(){
  try {
    await mongoose.connect(process.env.MONGOSERVER);
    console.log("MongoDB is connected");
  } catch(err){
    console.log(err);
    process.exit(1);
  }
}
module.exports = connectDB;
