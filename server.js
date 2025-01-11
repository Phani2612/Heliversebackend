const Express = require('express')


const App = Express()

const CORS = require('cors')
const JWT = require('jsonwebtoken')
const CookieParser = require('cookie-parser')

App.use(CookieParser())

require('dotenv').config()

const DB = require('./config/db')
DB()


App.use(Express.json())

App.use(Express.urlencoded({ extended: true }))

App.use(CORS({
    origin: 'https://heliversefrontend-theta.vercel.app', // Replace with your frontend domain
  credentials: true               // Allow cookies to be sent

}))


const UserRoutes = require('./routes/UserRoutes')
const MealRoutes = require('./routes/MealRoutes')
const DeliveryRoutes = require('./routes/DeliveryRoutes')

App.use('/' , UserRoutes)
App.use('/meal' , MealRoutes)
App.use('/delivery' , DeliveryRoutes)


App.listen(5000 , ()=>{

    console.log("Port is running at 5000")
})

