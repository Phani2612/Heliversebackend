const MealPlan_Model = require('../models/Meals')


const MealSave = async(req,res)=>{

     const {MealShifts , OID , Email ,  PantryStaffEmail} = req.body

     const {morning , afternoon , evening} = MealShifts
   

     try{

      const AddMeal = new MealPlan_Model({

            patientId : OID,
            meals : {

               morning : morning,
               afternoon : afternoon,
               evening : evening
            },
            createdBy : Email,
            Pantry_Staff : PantryStaffEmail

      })

      await AddMeal.save()

      return res.status(201).json({message : "Meal added successfully"})
      
          

     }

     catch(error){
        console.error(error)

        return res.status(500).json({message : "Internal Server error"})
     }
}



const DisplayMeals = async(req,res)=>{

   try{

      const AllData = await MealPlan_Model.find().populate('patientId')
      
      return res.status(200).json({AllData})

   }
   catch(error){
      return res.status(500).json({message : "Internal Server error"})
   }

}

const MealUpdates = async (req, res) => {
   const { taskId, mealTime, status } = req.body;
 
   try {
     // Find the meal plan by ID and update the specific meal's status
     const updatedMealPlan = await MealPlan_Model.findOneAndUpdate(
       { _id: taskId }, // Find the document by `taskId`
       { 
         $set: { [`meals.${mealTime}.status`]: status } // Update the nested status field
       },
       { new: true } // Return the updated document
     );
 
     if (!updatedMealPlan) {
       return res.status(404).json({ message: "Meal Plan not found" });
     }
 
     return res.status(200).json({
       message: "Meal status updated successfully",
       data: updatedMealPlan,
     });
   } catch (error) {
     console.error(error);
     return res.status(500).json({ message: "Internal Server Error" });
   }
 };





 const MealDeliveryEmailUpdate = async(req,res)=>{
   const {taskId,mealTime,deliveryAgentEmail} = req.body

   try {
      const updatedMealPlan = await MealPlan_Model.findOneAndUpdate(
        { _id: taskId },
        {
          $set: { [`meals.${mealTime}.Delivery_Staff`]: deliveryAgentEmail },
        },
        { new: true }
      );
  
      if (!updatedMealPlan) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      return res.status(200).json({ message: 'Delivery Agent email updated successfully', updatedMealPlan });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
 }




const HandleDelay = async(req,res)=>{
  try {
    const now = new Date();

    // Query to find all delayed meals
    const delayedMeals = await MealPlan_Model.find({
      $or: [
        { 'meals.morning.status': 'Pending', 'meals.morning.expectedCompletionTime': { $lt: now } },
        { 'meals.afternoon.status': 'Pending', 'meals.afternoon.expectedCompletionTime': { $lt: now } },
        { 'meals.evening.status': 'Pending', 'meals.evening.expectedCompletionTime': { $lt: now } },
      ],
    }).populate('patientId');

    if (delayedMeals.length === 0) {
      return res.status(200).json({ message: 'No delayed meals found.', delayedMeals: [] });
    }

    // Return delayed meals
    res.status(200).json({ message: 'Delayed meals retrieved successfully.', delayedMeals });
  } catch (error) {
    console.error('Error fetching delayed meals:', error);
    res.status(500).json({ message: 'Error fetching delayed meals.', error });
  }


}




 


module.exports = {MealSave , DisplayMeals , MealUpdates , MealDeliveryEmailUpdate , HandleDelay}