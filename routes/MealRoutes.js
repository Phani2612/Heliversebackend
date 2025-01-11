const Express = require('express')

const Router = Express.Router()

const authenticateToken = require("../middlewares/Middleware");

const {MealSave , DisplayMeals , MealUpdates , MealDeliveryEmailUpdate , HandleDelay} = require('../controllers/Mealshandling')

Router.post('/save'  , authenticateToken ,MealSave)
Router.get('/all' , authenticateToken, DisplayMeals)

Router.patch('/update' , authenticateToken ,MealUpdates)
Router.patch('/update-email' ,  authenticateToken , MealDeliveryEmailUpdate)

Router.get('/delay' , authenticateToken ,  HandleDelay)

module.exports = Router


