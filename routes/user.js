const {Router} = require("express");
const { check } = require("express-validator");

const { usersGet, usersPut, usersDelete, usersPost, usersPatch} = require("../controllers/user");
const {fieldsValidator} = require("../middlewares/fields-validator");
const {isRolValido, emailValidator, existsUserByID} = require("../helpers/db-validators");

const router = Router();

router.get("/", usersGet );

router.post("/",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").isLength({min: 6}),
    check("correo", "El correo no es valido").isEmail(), 
    check("correo").custom(emailValidator),
    // check("rol", "No es un rol válido").isIn(["Admin_rol", "user_rol"]),
    check("rol").custom( isRolValido ),
    fieldsValidator
] ,usersPost);

router.put("/:id",[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existsUserByID),
    check("rol").custom( isRolValido ),
    fieldsValidator
], usersPut);

router.put("/:id", usersPatch);

router.delete("/", usersDelete);


module.exports = router;