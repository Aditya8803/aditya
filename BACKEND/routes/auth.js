const express = require('express')
const User = require('../models/User')
const router = express.Router() 
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SECRET = "ThisIsInotebookApplication"
var fetchuser = require('../middleware/fetchuser')
var jwt = require('jsonwebtoken') 
// Route 1:Create a User using:POST "/api/auth/". Doesn't require autherization 
router.post('/createuser',[ 
     body('name', 'Enter a valid name').isLength({min:3}),
     body('email','Enter a valid email').isEmail(),
     body('password','Password must be atleast 5 character').isLength({min:5}), 
],async (req,res)=>{
     let success = false;
     //If there are errors return bad request and the errors
     const errors = validationResult(req)
     if(!errors.isEmpty()){
          console.log(errors);
          return res.status(400).json({success, errors:errors.array()});
     }
     //check wheteher the user with this email exists already
     try{
     let user = await User.findOne({email:req.body.email});
     if(user){
          return res.status(400).json({success , error:"Sorry user with this email already exists"})
     }
     const salt =  await bcrypt.genSalt(10);
     const secPass =  await bcrypt.hash(req.body.password, salt);
     //create a new user
     user = await User.create({
          name:req.body.name,
          email:req.body.email,
          password:secPass,
     });
     const data = {
          user:{ 
               id:user.id
          }
     }
     const authtoken = jwt.sign(data, JWT_SECRET)
     success = true
     res.json({success, authtoken});
     //catch errors
     }catch(error){
          console.log(error.message);
          res.status(500).send("Some error occured")
     }
})

//Route2: Authenticate a User using POST "/api/auth/login". No login required
router.post('/login', [
     body('email', 'Enter a valid email').isEmail(),
     body('password', 'Password cannot be blank').exists(),
], async(req, res) => {
     let success = false
     const errors = validationResult(req);
     if(!errors.isEmpty()){
          console.log(errors);
          return res.status(400).json({errors:errors.array() });
     }

     const {email, password} = req.body;
     try{
          let user = await User.findOne({email});
          if(!user){
               success = false
               return res.status(400).json({error:"Invalid Email"})
          }
          const passwordCompare = await bcrypt.compare(password, user.password);
          if(!passwordCompare){
               success = false
               return res.status(400).json({success , error:"Invalid password"})
          }
          const data = {
               user:{
                    id:user.id
               }
          }
          const authtoken = jwt.sign(data, JWT_SECRET)
          success = true;
          res.json({success, authtoken})
     }
     catch(error){
          console.log(error.message);
          res.status(500).send("Internal Server Error"); 
     }
});

//Route 3: Get loggedIn User Details using POST "/api/auth/getUser" Login required
router.post('/getuser',fetchuser, async(req, res) => {
     try{
          userId = req.user.id;
          //select all fields except password
          const user = await User.findById(userId).select("-password")
          res.send(user);
     }catch(error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
     }
});


module.exports = router