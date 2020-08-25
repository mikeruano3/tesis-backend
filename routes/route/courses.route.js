const express               = require('express');
const app                   = express();
const router 		        = express.Router();
const dataCtrl	            = require('../../controllers/courses/courses.controller')

module.exports = router

router.get('/findone/:id',               dataCtrl.findOne)
router.get('/findall',                   dataCtrl.findAll)
router.post('/findmany/:id',             dataCtrl.findMany)
router.post('/insert/',                  dataCtrl.insertOne)
router.put('/update/',                   dataCtrl.update)
router.delete('/delete/:id',             dataCtrl.deleteRow)

