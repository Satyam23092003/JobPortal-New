import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;


    //all fields are required
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    const user = await User.findOne({ email });
    //check email is already registed or not
    if (user) {
      return res.status(401).json({
        success: false,
        message: "Email id already exists",
      });
    }

    //hash the password ->we need the bcrypt package
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    return res.status(200).json({
      message: `Account created successfull ${fullName}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Register",
      success: false,
    });
  }
};

    export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
 
   
 
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    let user = await User.findOne({ email });
    // console.log(user)
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found ",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
       return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    //check for the role
    if (user.role !== role) {
      return res.status(403).json({
        message: "You dont have the necessary role to access this resource",
        success: false,
      });
    }

    //generate the token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        user,
        message: `Welcome back ${user.fullName}`,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Login",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error Logout",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.files;
    

    //cloudinary uploaderrr ->>codeeeeee
    let skillsArray;
    if(skills){
       skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware se aayega

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not exist",
      });
    }

    //update the database
  if(fullName){
    user.fullName=fullName;
  }
  if(email){
    user.email=email;
  }
  if(phoneNumber){
    user.phoneNumber=phoneNumber;
  }
  if(bio){
    user.profile.bio=bio;
  }
    
  if(skills){
  user.profile.skills=skillsArray;
}

    // user.fullName = fullName;
    // user.email = email;
    // user.phoneNumber = phoneNumber;
    // user.bio = bio;
    // user.skills = skillsArray;

    await user.save();

    user = {
        _id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      };


      return res.status(200).json({
        message:"Profile uploaded successfully",
        user,
        success:true
      })
  } catch (error) {

    res.status(500).json({
        message: "Server Error Updating Profile",
        success: false,
      });
  }
};
