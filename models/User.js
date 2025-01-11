const Mongoose = require('mongoose')


const User_Table_Schema = new Mongoose.Schema({

      UT_Type : {

        type : String 
      },

      UT_Email : {

         type : String 
      },

      UT_Password : {

         type : String
      }
})


const User_Model = Mongoose.model('User_Model' , User_Table_Schema)


module.exports  = User_Model