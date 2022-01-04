const {response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = Response, next) => {

    const token = req.header("x-token");
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETKEY);

        const user = await Usuario.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: "Token no válido - usuario no existe",
            })
        }

        //Verificar si el usuario esta hablitado
        if(!user.estado){
            return res.status(401).json({
                msg: "Token no válido - usuario desabilitado",
            })
        }

        req.user = user;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        })
    }

}

module.exports = {
    validarJWT,
}