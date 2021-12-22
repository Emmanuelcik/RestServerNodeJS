const express = require('express');
const cors = require('cors');
const { dbConection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = "/api/users";

        //Conexion a la base de datos
        this.conectDB();
        
        //Middlewares
        this.middlewares();
        //rutas de la app
        this.routes();
    }

    async conectDB() {

        await dbConection();
    }

    middlewares(){
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body 
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static("public") );
    }

    routes(){
        this.app.use(this.usersPath, require("../routes/user"));
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log("servidor corriendo en el puerto", this.port)
        })
    }
}

module.exports = Server;