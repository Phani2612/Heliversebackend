const Mongoose = require('mongoose')



const ConnectDB = async()=>{

       try{

          const Conn = await Mongoose.connect(process.env.MONGODB_URL , {
              
               

          })

          console.log(`mongodb connected : ${Conn.connection.host}`)

       }

       catch(error){

        console.error(`Error: ${error.message}`);
        process.exit(1);
       }
}


module.exports = ConnectDB
