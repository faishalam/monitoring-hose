const express = require('express')
const selangRouter = express.Router()
const SelangController = require('../controllers/selangController')
const authentication = require('../middleware/authentication')

selangRouter.use(authentication)
selangRouter.get('/data', SelangController.getAllData)
selangRouter.get('/myData', SelangController.getMyData)
selangRouter.get('/getHistory', SelangController.getAllHistory)
selangRouter.post('/create', SelangController.createData)
selangRouter.post('/history', SelangController.createHistory)
selangRouter.put('/data', SelangController.updateHm)
selangRouter.get('/data/:id', SelangController.getAssetById)
selangRouter.delete('/data/:id', SelangController.deleteData)
selangRouter.delete('/history/:id', SelangController.deleteHistory)
selangRouter.put('/data/:id', SelangController.updateData)

// selangRouter.patch('/data/:id', SelangController.updateStatus)



module.exports = selangRouter