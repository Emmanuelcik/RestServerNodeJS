const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usersGet = async (req = request, res = response) =>{

    // const {q="no query", nombre="no name", apikey="123"} = req.query;
    const {limit = 5, desde = 0} = req.query;
    const query = {estado: true};

    // const users = await Usuario.find(query)
    //     .skip( Number(desde) )
    //     .limit(Number(limit));
    
    // const counter = await Usuario.countDocuments(query); 

    const [users, total] = await Promise.all([
        Usuario.find(query)
        .skip( Number(desde))
        .limit(Number(limit)),
        Usuario.countDocuments(query)
    ]);
    
    res.json({
        total,
        users,
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

const usersPut = async (req, res) =>{

    const {id} = req.params;
    const {_id, password, google, correo, ...resto } = req.body;

    if(password){
        //Encriptar la contraseña (hasheo)
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    
    res.status(403).json({
        msg: "put API - Controller",
        usuario,
    });
}

const usersPatch = (req, res) =>{

    const {id} = req.params;

    res.status(403).json({
        msg: "patch API - Controller",
        id,
    });
}

const usersDelete = async (req, res) =>{

    const {id} = req.params;

    //Borrar de la bd
    const usuario = await Usuario.findByIdAndDelete(id);

    res.json(usuario);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}