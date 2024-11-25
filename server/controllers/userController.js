import bcrypt from "bcrypt";
import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const userData = { name, email, password: hashedPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Respond with success
    return res.status(201).json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Respond with success
    return res.status(200).json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const userCredits = async (req, res)=> {
  try{
    const {userId} = req.body

    const user = await userModel.findById(userId) 
    res.json({success:true, credits:user.creditBalance, user: {name: user.name}})
  }catch(error) {
    console.log(error.message)
    res.json({success: false, message: error.message})
  }
}

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async (req, res) => {
  try{
    const {userId, planId} = req.body
    const userData = await userModel.findById(userId)

    if(!userId || !planId) {
      return  res.json({success:false, message:"Mising Details"})
    }
      let credits, plan , amount, date 
        
      switch(planId) {
        case 'Basic' : 
        plan = "Basic"
        credits = 100
        amount = 10
        break;

        case 'Advanced' : 
        plan = "Advanced"
        credits = 500
        amount = 10
        break;

        case 'Business' : 
        plan = "Business"
        credits = 5000
        amount = 250
        break;

        default:
          return res.json({success:false, message:"Plan Not found"});
      }
      date = Date.now();

      const transactionData = {
        userId, plan, amount, credits, date
      }
      const newTranscation = await transactionModel.create(transactionData)
      const options ={
        amount: amount * 100,
        currency : process.env.CURRENCY,
        receipt :newTranscation._id ,

      }
      await razorpayInstance.orders.create(options, (error, order) => {
          if(error) {
            console.log(error);
            return res.json({success:false, message:error});
          }
          res.json({success:true, order})
      })

  }catch(error) {
      console.log(error)
      res.json({success:false, message:error.message})
  }
}

export { registerUser, loginUser, userCredits , paymentRazorpay};
