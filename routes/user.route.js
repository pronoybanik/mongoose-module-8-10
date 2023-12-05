const express = require("express");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();


router.post("/signup", userController.signup);
// router.get("/signup/confirmation/:token", userController.confirmEmail);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);
router.get("/", userController.getAllUser);


router.route("/:id")
    .get(userController.getUserById)
    .patch(userController.updateUserById)
    .delete(userController.deleteUserById)

module.exports = router;