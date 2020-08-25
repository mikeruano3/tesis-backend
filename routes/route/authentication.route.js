const express               = require('express');
const app                   = express();
const router 		        = express.Router();
const authCtrl	            = require('../../controllers/auth/auth.controller')

module.exports = router

router.post('/signin',       authCtrl.signin);