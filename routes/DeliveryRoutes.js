const Express = require('express')

const Router = Express.Router()

const authenticateToken = require('../middlewares/Middleware')

const {UpdateDelivery , GetAlldata} = require('../controllers/DeliveryHandling')

Router.get('/all/:User' , authenticateToken ,  GetAlldata)
Router.patch('/update' , authenticateToken , UpdateDelivery)

module.exports = Router