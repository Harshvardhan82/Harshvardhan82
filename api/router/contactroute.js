const express = require("express");
const router = express.Router();

const SyncContacts = require("../controllers/syncContacts");
const CreateGroup = require("../controllers/CreateGroup");

router.post("/sync/", SyncContacts.allContacts);
router.post("/createGroup/", CreateGroup.CreateGroup);

module.exports = router;
