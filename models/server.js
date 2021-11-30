const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();
        //rutas de la app
        this.routes();
    }
    middlewares(){
        //Cors
        this.app.use(cors());

        //Directorio publico
        this.app.use( express.static("public") )
    }

    routes(){
        this.app.get("/api", (req, res) =>{
            res.status(403).json({
                msg: "get API",
            });
        });

        this.app.put("/api", (req, res) =>{
            res.status(403).json({
                msg: "put API",
            });
        });

        this.app.delete("/api", (req, res) =>{
            res.status(403).json({
                msg: "delete API",
            });
        });

        this.app.post("/api", (req, res) =>{
            res.status(403).json({
                msg: "post API",
            });
        });
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log("servidor corriendo en el puerto", this.port)
        })
    }
}

module.exports = Server;