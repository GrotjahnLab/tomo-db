const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        const mongodbUser = 'kapa4902';
        const mongodbCluster = 'cluster0.ey5a5ua.mongodb.net';
     
        const mongodbPassword = process.env.MONGODB_PASSWORD;

        const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbCluster}/`;

        const conn = await mongoose.connect(uri);
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;