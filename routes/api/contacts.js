const express = require("express");

const ctrl = require("../../controllers/contactsControllers");

const { validationSchema, updateFavoriteSchema } = require("../../models");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getOneContactById);

router.post("/", authenticate, validateBody(validationSchema), ctrl.addNewContact);

router.put("/:contactId", authenticate, isValidId, validateBody(validationSchema), ctrl.updateById);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), ctrl.updateStatusContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
