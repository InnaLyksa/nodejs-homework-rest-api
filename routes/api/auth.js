const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/authControllers");
const { validateBody, isValidId, authenticate, upload } = require("../../middlewares");
const { loginSchema, registerSchema, updateSubcriptionSchema } = require("../../models");

router.post("/register", validateBody(registerSchema), ctrl.register);
router.post("/login", validateBody(loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(updateSubcriptionSchema), ctrl.updateSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
