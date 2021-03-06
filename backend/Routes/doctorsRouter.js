const express=require('express')
const router = express.Router()
const Doctor = require('../models/doctorModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ValidationLogin } = require("../controller/validation");

/**-------------------------------------- GETTING All The USERS DOCTORS ----------------------------------  **/

router.get ('/', async (req,res)=>{
    try {
        const doctors = await Doctor.find()
        res.status(200).send(doctors)
    } catch (error) {
        res.status(400).send({msg:error})
    }    
})

/**------------------------------------------- REGISTER A USER DOCTOR ------------------------------------- **/

router.post('/add_doctor',async (req,res)=>{
    //check if email is already Exist
    const emailExist = await Doctor.findOne({ email: req.body.email });
    if (emailExist) res.status(400).send("email is already exist");
    else {
        
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const doctor = new Doctor({
            name : req.body.name,
            practiceName : req.body.practiceName,
            speciality : req.body.speciality,
            address : req.body.address,
            email : req.body.email,
            phone : req.body.phone,
            password: hashedPassword,    
            })
        const savedDoctor = await doctor.save()
        res.status(200).send(savedDoctor)
    } catch (error) {
        res.status(400).send('error add')
    }
}
})
/**------------------------------------------- LOGIN A USER DOCTOR ------------------------------------- **/

router.post("/login_doctor", async (req, res) => {
    // Validation
    const { error } = ValidationLogin(req.body);
    if (error) res.status(400).send("invalid email or password");
    else {
      // Check if email is found
      const user = await Doctor.findOne({ email: req.body.email });
      if (!user) res.status(400).send("Invalid email or password");
      else {
        // Check password
        const passwordVerify = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!passwordVerify) res.status(400).send("Invalid email or password");
        // Create and assgin a token
        try {
          const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
          res.header("auth-token", token).status(200).send({ user, token });
        } catch (err) {
          res.status(400).send({ msg: err });
        }
      }
    }
  });
  





module.exports = router