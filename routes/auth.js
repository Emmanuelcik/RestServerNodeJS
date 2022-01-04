const {Router} = require("express");
const { check } = require("express-validator");
const {validarJWT} = require("../middlewares/validar-jwt");
const {login} = require("../controllers/auth");
const { fieldsValidator } = require("../middlewares/fields-validator");

const router = Router();

router.post("/login",[
    
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria").not().isEmpty(),
    fieldsValidator,
], login );



module.exports = router;