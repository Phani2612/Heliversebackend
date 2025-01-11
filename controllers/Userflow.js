const Login_Model = require('../models/User')

const Patient_Model = require('../models/Patients')

const BCRYPT = require('bcryptjs')

const jwt = require('jsonwebtoken')



const SignUp = async (req, res) => {

  const { Email, Password, Role } = req.body

  try {

    const IsuserExists = await Login_Model.findOne({ UT_Email: Email })

    if (!IsuserExists) {

      const hashedPassword = await BCRYPT.hash(Password, 12)


      const NewUser = new Login_Model({

        UT_Email: Email,
        UT_Password: hashedPassword,
        UT_Type: Role
      })

      await NewUser.save()

      return res.status(201).json({ message: "User successfully created", redirect_url: '/' })


    }

    else {


      return res.status(409).json({ message: "User already exists", redirect_url: '/' })

    }

  }
  catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}


const Login = async (req, res) => {


  const { email, password } = req.body


  try {
    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required." });
    }

    // Check if user exists in the database
    const Result = await Login_Model.findOne({ UT_Email: email });

    if (Result) {
      // Extract entered and actual passwords
      const EnteredPassword = password;
      const ActualPassword = Result.UT_Password;

      // Compare the passwords
      const confirmation = await BCRYPT.compare(EnteredPassword, ActualPassword);

      if (confirmation === true) {


        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
    res.cookie("token", token, {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    path: "/",
    sameSite: "None", // Only use with HTTPS
    secure: true // Only use with HTTPS
});

      

        if (Result.UT_Type === 'Manager') {
          return res.status(200).json({
            message: "Login successful. Redirecting to home page.",
            redirect_url: "/manager",
            User_OID: Result._id,
            Auth_Token: token,
            User_Type : Result.UT_Type
            
          });
        }

        else if (Result.UT_Type === 'Pantry') {

          return res.status(200).json({
            message: "Login successful. Redirecting to home page.",
            redirect_url: "/pantry",
            User_OID: Result._id,
            Auth_Token: token,
            User_Type : Result.UT_Type
          });
        }

        else {

          return res.status(200).json({
            message: "Login successful. Redirecting to home page.",
            redirect_url: "/delivery",
            User_OID: Result._id,
            Auth_Token: token,
            User_Type : Result.UT_Type
          });


        }




      } else {
        // Password mismatch
        return res.status(401).json({ message: "Incorrect password. Please try again." });
      }
    } else {
      // User does not exist
      return res.status(404).json({
        message: "User not found. Please register to continue.",
        redirect_url: "/signup",
      });
    }
  } catch (error) {
    console.error(error);
    // Internal server error
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }

}




const PatientData = async (req, res) => {


  const { patientName, diseases, allergies, roomNumber, bedNumber, floorNumber, age, gender, contactInfo, emergencyContact, others } = req.body

  try {

    const newData = new Patient_Model({

      name: patientName,
      age: age,
      gender: gender,
      contactInfo: contactInfo,
      emergencyContact: emergencyContact,
      diseases: diseases,
      allergies: allergies,
      roomNumber: roomNumber,
      bedNumber: bedNumber,
      floorNumber: floorNumber,
      otherDetails: others
    })

    await newData.save()

    return res.status(201).json({ message: 'Data saved successfully , redirecting to meal page', Patient_ID: newData._id, redirect_url: `/manager/${newData._id}` })

  }

  catch (error) {

    console.error(error.response)
    return res.status(500).json({ message: 'Internal Server error' })
  }
}


module.exports = { Login, PatientData, SignUp }
