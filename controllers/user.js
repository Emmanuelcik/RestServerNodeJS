const { response, request } = require("express");

const usersGet = (req = request, res = response) =>{

    const {q="no query", nombre="no name", apikey="123"} = req.query;
    
    res.json({
        msg: "get API - Controller",
        q,
        nombre,
        apikey
    });
}

const usersPost = (req, res) =>{
    
    const {nombre, edad} = req.body;
    
    res.json({
        msg: "post API - Controller",
        nombre,
        edad,
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