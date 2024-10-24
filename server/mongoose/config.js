const mongoose = require('mongoose')
const uri = "mongodb+srv://sajidalhijas:seclobtask@arabnodetask1.zbqfc1a.mongodb.net/?retryWrites=true&w=majority&appName=ArabNodeTask1";

const connection = async () => {
    try {
        const connect = await mongoose.connect(
            uri,
        )
        console.log("DataBase Connected Successfully..");
    } catch (error) {
        console.log(`DataBase Error is : ${error}`);
        process.exit();
    }

}

module.exports = connection;