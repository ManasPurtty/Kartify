
const usermodel = require('../models/usermodel');
const ownermodel = require('../models/ownermode'); // <-- require owner model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generatetoken");

module.exports.registerUser= async (req, res) => {
    try {
        let { email, fullname, password } = req.body;

        if (!email || !fullname || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        let olduser =await usermodel.findOne({email:email});
        if(olduser) return res.send("already ahve an account pls login")
        const hash = await bcrypt.hash(password, 10);
       console.log('Creating user:', email, fullname);
const user = await usermodel.create({
    email,
    fullname,
    password: hash
});
console.log('User created:', user);
            let token= generateToken(user);
       res.cookie("token",token);
        res.send("user created ");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
}



module.exports.loginUser = async function(req, res) {
    let { email, password } = req.body;

    // 1. Check if email exists in owner collection
    let owner = await ownermodel.findOne({ email: email });
    if (owner) {
        // Compare password for owner
        bcrypt.compare(password, owner.password, function(err, result) {
            if (result) {
                let token = generateToken(owner);
                res.cookie("token", token);
                return res.redirect("/owners/admin");
            } else {
                return res.send("owner password incorrect");
            }
        });
        return; // Stop further execution
    }

    // 2. Check if email exists in user collection
    let user = await usermodel.findOne({ email: email });
    if (!user) return res.send("email and password incorrect");

    bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        } else {
            res.send("user email and password incorrect");
        }
    });
};

module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/");
}