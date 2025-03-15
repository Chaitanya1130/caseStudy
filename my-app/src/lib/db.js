import mongoose from 'mongoose'

const mongoURL=process.env.MONGO_URI
const connectDB=async()=>{
    if(mongoose.connection.readyState===1){
        return;
    }
    await mongoose.connect(mongoURL);
}
export default connectDB