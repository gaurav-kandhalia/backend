const express = require('express');
const router = express.Router();
const user = require('../controller/user')

router.post('/register',user.register);
router.post('/login',user.login);
router.post('/me',user.My_profile);
router.post('/update',user.Update_profile)

module.exports = router;






