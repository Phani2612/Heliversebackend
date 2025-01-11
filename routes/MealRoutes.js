const Express = require('express')

const Router = Express.Router()

const authenticateToken = require("../middlewares/Middleware");

const {MealSave , DisplayMeals , MealUpdates , MealDeliveryEmailUpdate , HandleDelay} = require('../controllers/Mealshandling')

Router.post('/save' ,MealSave)
Router.get('/all' , DisplayMeals)

Router.patch('/update' , MealUpdates)
Router.patch('/update-email'  , MealDeliveryEmailUpdate)

Router.get('/delay' ,   HandleDelay)

module.exports = Router


