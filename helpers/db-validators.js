const Rol = require("../models/rol");
const Usuario = require("../models/usuario");

const isRolValido = async (rol= "") =>{
    const existeRol = await Rol.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${rol} no existe en la bd`);    
    }
}

async function emailValidator (correo = "") {

    const existeEmail = await Usuario.findOne({correo: correo});
    if(existeEmail){
        throw new Error("Este correo ya ha sido registrado!")
    }
}

module.exports = {
    isRolValido,
    emailValidator,
}