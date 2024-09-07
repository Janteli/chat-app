import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import  createTokenAndSaveCookies  from "../jwt/generateToken.js"; 


export const signup = async (req, res) =>{
    const {fullname, email, password, confirmPassword } = req.body;

    try {
        if(password !== confirmPassword){
            return res.status(400).json({error: "password do not match"})
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({error: "User already registered"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await new User({
            fullname,
            email,
            password: hashPassword
        })
    
        await newUser.save()
        if(newUser){
            createTokenAndSaveCookies(newUser._id, res)
            res.status(201).json({message: "User Created Successfully", user:{
                _id:newUser._id,
                fullname:newUser.fullname,
                email: newUser.email
            }})
        }
    } catch (error) {
        console.log(error)
        res.status(501).json({error: "Internal Server Error "})
    }
}

export const login = async(req, res)=>{
    const {email, password} = req.body
      console.log("login-backend", email, password)
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(500).json({error: "Wrong Password"})
        }
        createTokenAndSaveCookies(user._id, res)
        res.status(201).json({message: "User Logged In",user:{
            _id:user._id,
            fullname:user.fullname,
            email: user.email
        }} )
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error From Login Controller"})
    }
}

export const logout = async (req, res) =>{
    try {
        res.clearCookie("jwt")
        res.status(201).json({message: "User Logout Successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Error From LogOut Controller"})
    }
}

export const allUser = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUser = await User.find({_id: {$ne: loggedInUser}}).select("-password")
        res.status(201).json({filteredUser})
    } catch (error) {
        console.log("Error in allUsers Controller:" + error)
    }
}