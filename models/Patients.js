const Mongoose = require('mongoose')

const Patient_Schema = new Mongoose.Schema({

    name: String,
    age: Number,
    gender: String,
    contactInfo: String,
    emergencyContact: String,
    diseases: String,
    allergies: String,
    roomNumber: String,
    bedNumber: String,
    floorNumber: String,
    otherDetails: String,
    createdAt: { type: Date, default: Date.now }
})


const Patient_Model = Mongoose.model('patients' , Patient_Schema)


module.exports = Patient_Model