
const {Router} = require("express");
const { usersGet, usersPut, usersDelete, usersPost, usersPatch} = require("../controllers/user");

const router = Router();

router.get("/", usersGet );

router.post("/", usersPost);

router.put("/:id", usersPut);

router.put("/:id", usersPatch);

router.delete("/", usersDelete);


module.exports = router;