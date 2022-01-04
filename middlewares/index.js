const fieldsValidator = require("./fields-validator");
const validarJWT  = require("./validar-jwt");
const isAdmin  = require("./validar-roles");

module.exports = {
    ...fieldsValidator,
    ...validarJWT,
    ...isAdmin,
}