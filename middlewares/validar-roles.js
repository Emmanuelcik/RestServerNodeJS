

const isAdmin = (req, res, next) => {

    if( !req.user){
        return res.status(500).json({
            msg: "se quiere verificar el rol sin validar el token primero"
        });
    }

    const {rol, nombre} = req.user;

    if(rol !== "Admin_rol"){
        return res.status(401).json({
            msg: `${nombre} no es usuario administrador`,
        })
    }

    next();
}

module.exports = {
    isAdmin,
}