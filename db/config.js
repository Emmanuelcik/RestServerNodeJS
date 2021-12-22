const mongoose = require("mongoose");

const dbConection = async () => {

    try {
        await mongoose.connect( process.env.MONGODBC ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log("BD conectada");
    } catch (error) {
        console.log(error);
        throw new Error("Error en la bd");
    }
    
}

module.exports = {
    dbConection,
}