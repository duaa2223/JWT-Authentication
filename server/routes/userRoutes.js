const express = require('express');
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth'); 
const router = express.Router();


router.post('/signup', registerUser); 

router.post('/signin', loginUser);

router.get('/profile/:id',authenticateToken,getProfile)

// router.get('/profile/:id',authenticateToken , getProfile);

module.exports = router;


