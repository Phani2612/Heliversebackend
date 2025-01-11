const MealPlan_Model = require('../models/Meals')


const UpdateDelivery = async(req , res)=>{

    const {taskId , newStatus , mealTime} = req.body

    try {
        // Find the meal plan by ID and update the specific meal's status
        const updatedMealPlan = await MealPlan_Model.findOneAndUpdate(
          { _id: taskId }, // Find the document by `taskId`
          { 
            $set: { [`meals.${mealTime}.Delivery_Status`]: newStatus } // Update the nested status field
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


}


const GetAlldata = async (req, res) => {
    try {
      const { User } = req.params; // The email of the delivery agent
  
      // Find all meal plans where the delivery staff matches the provided email
      const tasks = await MealPlan_Model.find({
        $or: [
          { "meals.morning.Delivery_Staff": User },
          { "meals.afternoon.Delivery_Staff": User },
          { "meals.evening.Delivery_Staff": User },
        ],
      })
      .populate('patientId'); // Populating the patientId field with actual patient data
  
      res.json({ AllData: tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).send("Server error");
    }
  };
  

module.exports = {UpdateDelivery , GetAlldata}