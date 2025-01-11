const Express = require('express')

const Router = Express.Router()

const authenticateToken = require('../middlewares/Middleware')

const {UpdateDelivery , GetAlldata} = require('../controllers/DeliveryHandling')

Router.get('/all/:User'  ,  GetAlldata)
Router.patch('/update', UpdateDelivery)

module.exports = Router
