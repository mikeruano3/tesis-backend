const express               = require('express');
const app                   = express();
const router 		        = express.Router();
const authCtrl	            = require('../../controllers/auth/auth.controller')

module.exports = router

router.post('/signin',                  authCtrl.signin);
router.post('/signup-app-user',         authCtrl.registerAppUser);
router.put('/update-app-user/:id',      authCtrl.updateAppUser);
router.post('/send-reset-password',     authCtrl.sendEmailResetPassword);
router.post('/reset-password-data',     authCtrl.resetPasswordWithData);