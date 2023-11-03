const User = require('../model/user');




const register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // check user with this email exist or not:
      let user = await User.findOne({ email });
  
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
  
      // create new user now and save it in data base:
      user = await User.create({
        name,
        email,
        password,
      });
  
      const token = await user.generateToken();
  
      // cookie set with expire date : this cookie expire after 90 days : formula :: days(eg:4)*hours(24)*minutes(60)*second(60)*milliSecond(1000)
      return res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          success: true,
          token,
        });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message , err:err});
    }
  }

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check : user exit with this email or not.  => by  findOne function:
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "your email does not exits:",
      });
    }

    // check password:
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    // cookie set with expire date : this cookie expire after 90 days : formula :: days(eg:4)*hours(24)*minutes(60)*second(60)*milliSecond(1000)
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        token,
        user,
      });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
  }

  const My_profile = async(req,res)=>{
    try {
      let user = await User.findById(req.body.id);
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "create your account",
      });
    }
  }
  const Update_profile = async(req,res)=>{
    try {
      const { name, email ,password} = req.body;
  
      const user = await User.findById(req.body.id);
  
      if (name) user.name = name;
      if (email) user.email = email; 
      if (password) user.password = password; 
  
      await user.save();
  
      return res.status(200).json({ success: true, message: "Profile Updated" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

module.exports = {register,login,My_profile,Update_profile};