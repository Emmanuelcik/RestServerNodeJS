const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");


const login = async (req, res) => {
    
    const {correo, password} = req.body;

    try {

        //Vericar if the email exists
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos"
            });
        }
        //user is active
        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario esta dado de baja"
            });
        }
        //password 
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "El password no es correcto",
            });
        }
        //JWT
        // const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login ok",
            correo,
            password,
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: "Something went wrong",
        })
    }
}


module.exports = {
    login,
}