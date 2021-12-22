const {Router} = require("express");
const { check } = require("express-validator");
const { usersGet, usersPut, usersDelete, usersPost, usersPatch} = require("../controllers/user");
const {fieldsValidator} = require("../middlewares/fields-validator");

const router = Router();

router.get("/", usersGet );

router.post("/",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").isLength({min: 6}),
    check("rol", "No es un rol válido").isIn(["Admin_rol", "user_rol"]),
    check("correo", "El correo no es valido").isEmail(),
    fieldsValidator
] ,usersPost);

router.put("/:id", usersPut);

router.put("/:id", usersPatch);

router.delete("/", usersDelete);


module.exports = router;