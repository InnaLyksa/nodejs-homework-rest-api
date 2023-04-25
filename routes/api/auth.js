const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/authControllers");
const { validateBody, isValidId } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../models");

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", validateBody(loginSchema), ctrl.login);

module.exports = router;
