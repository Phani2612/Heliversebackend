const Express = require('express')

const Router = Express.Router()


const {Login , PatientData , SignUp} = require('../controllers/Userflow')

const authenticateToken = require('../middlewares/Middleware')

Router.post('/login' , Login)
Router.post('/signup' , SignUp)


Router.post('/save/patients' , authenticateToken , PatientData)



module.exports = Router