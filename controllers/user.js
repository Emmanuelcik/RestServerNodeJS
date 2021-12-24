const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usersGet = (req = request, res = response) =>{

    const {q="no query", nombre="no name", apikey="123"} = req.query;
    
    res.json({
        msg: "get API - Controller",
        q,
        nombre,
        apikey
    });
}

const usersPost = async (req, res) =>{
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña (hasheo)
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar en la bd
    await usuario.save();
    
    res.json({
        usuario,
    });

}

const usersPut = (req, res) =>{

    const {id} = req.params;

    res.status(403).json({
        msg: "put API - Controller",
        id,
    });
}

const usersPatch = (req, res) =>{

    const {id} = req.params;

    res.status(403).json({
        msg: "patch API - Controller",
        id,
    });
}

const usersDelete = (req, res) =>{

    res.status(403).json({
        msg: "delete API - Controller",
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}