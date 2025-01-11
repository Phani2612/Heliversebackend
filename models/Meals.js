const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients', // Reference to the Patient collection
    required: true,
  },
  meals: {
    morning: {
      details: { type: String, required: true },
      ingredients: { type: String, required: true },
      instructions: { type: String, default: '' },
      status : {type : String , default : 'Pending'},
      Delivery_Staff : {

        type : String,
        default : ''
      },

      Delivery_Status : {

        type : String,
        default : 'Pending'
   },

   expectedCompletionTime: { type: Date },
 
    },
    afternoon: {
      details: { type: String, required: true },
      ingredients: { type: String, required: true },
      instructions: { type: String, default: '' },
      status : {type : String , default : 'Pending'},
      Delivery_Staff : {

        type : String,
        default : ''
      },

      Delivery_Status : {

        type : String,
        default : 'Pending'
   },

   expectedCompletionTime: { type: Date },
 
    },
    evening: {
      details: { type: String, required: true },
      ingredients: { type: String, required: true },
      instructions: { type: String, default: '' },
      status : {type : String , default : 'Pending'},
      Delivery_Staff : {

        type : String,
        default : ''
      },

      Delivery_Status : {

        type : String,
        default : 'Pending'
   },

   expectedCompletionTime: { type: Date },
 
    },
  },


  Pantry_Staff : {

     type : String,
     required : true
  },



  
  
  

  createdBy: {
    type: String,
    ref: 'Manager', // Reference to the Manager collection
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mealPlanSchema.pre('save', function (next) {
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  const now = new Date(this.createdAt || Date.now());

  // Dynamically set expected completion times
  if (!this.meals.morning.expectedCompletionTime) {
    this.meals.morning.expectedCompletionTime = new Date(now.getTime() + oneHour);
  }
  if (!this.meals.afternoon.expectedCompletionTime) {
    this.meals.afternoon.expectedCompletionTime = new Date(now.getTime() + oneHour * 4); // Afternoon offset
  }
  if (!this.meals.evening.expectedCompletionTime) {
    this.meals.evening.expectedCompletionTime = new Date(now.getTime() + oneHour * 10); // Evening offset
  }

  this.updatedAt = Date.now();
  next();
});



const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
