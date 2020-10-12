const express               = require('express');
const app                   = express();
const router 		        = express.Router();
const dataCtrl	            = require('../../controllers/files/driveapi')

module.exports = router

router.get('/listfiles', dataCtrl.listFiles)
router.post('/createfolder', dataCtrl.createFolder)
router.post('/createfile', dataCtrl.createFile)
router.get('/filedata/:id', dataCtrl.getFileData)
router.delete('/filedata/:id', dataCtrl.deleteFile)

