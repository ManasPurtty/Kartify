const express = require('express');
const router = express.Router();
const ownerModel = require('../models/ownermode'); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generatetoken");
router.get('/', (req, res) => {
    res.send('owner is working');
});


router.post('/create', async(req, res) => {
     let owner=await ownerModel.find();
     if(owner.length > 0) {
         return res
         .status(503)
        .send('Owner already exists');
     }
     let {fullname,email,password}=req.body;
     let createdowner =await ownerModel.create({
        fullname,
        email,
        password
        
     });
     res.status(203).send(createdowner);
   })


router.post('/login', async(req,res)=>{
    let { email, password } = req.body;
    
        // 1. Check if email exists in owner collection
        let owner = await ownerModel.findOne({ email: email });
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
   });


const isloggedin = require('../middleware/isloggedin');

router.get("/admin",   function(req, res) {
    let success = req.flash("success");
    res.render("createproducts", { success });
});


module.exports = router;