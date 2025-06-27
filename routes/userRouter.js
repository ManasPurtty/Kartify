const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logout} =require ("../controller/authController")
const isloggedin =require("../middleware/isloggedin");



router.get('/', (req, res) => {
    res.send('User route is working');
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);






module.exports = router;
