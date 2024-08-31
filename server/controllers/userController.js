const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user')
// register new user 
 exports.registerUser = async(req,res) => {
    try {
        const {username,password} =req.body;
        //hash password 
        const hashpassword = await bcrypt.hash(password,10);
        //creat new user
        const newUser = new User({username,password:hashpassword});
        await newUser.save();
 res.status(201).json({message: 'User registered successfully' });
    }
    catch(error){
        res.status(500).json({message: error.message });
    }
};


// login and tack token 
// تسجيل دخول المستخدم
exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // البحث عن المستخدم بناءً على اسم المستخدم
      const user = await User.findOne({ where: { username } });
      if (!user) return res.status(400).json({ message: 'Invalid username or password' });
  
      // التحقق من تطابق كلمة المرور
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });
  
      // إنشاء التوكن
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ token , userId: user.id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
exports.getProfile = async (req, res) => {
    try {
      
      const userId = req.params.id;
  
    
      const user = await User.findByPk(userId, {
        attributes: ['username', 'password'] 
      });
  
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Unable to fetch profile' });
    }
  };