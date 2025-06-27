const express=require("express");
const router =express.Router();
const isloggedin =require("../middleware/isloggedin");
const productmodel = require("../models/productmodel");
const usermodel = require("../models/usermodel");
const ownermodel=require("../models/ownermode");

router.get("/",(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error,isloggedin:false});
});

router.get("/shop", isloggedin, async (req, res) => {
    try {
        const products = await productmodel.find();
      let success = req.flash("success");
res.render("shop", { product: products, success });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.render("shop", { product: [],success }); // Send an empty array if there's an error
    }
});

 router.get("/ownerlogin",(req,res)=>{
    res.render("owner-login")
});





 router.get("/logout",isloggedin,(req,res)=>{
    res.render("shop")
});





 router.get("/addtocart/:id",isloggedin,async(req,res)=>{
let user =await usermodel.findOne({email:req.user.email});
user.cart.push(req.params.id);
await user.save();
req.flash("success","Added to cart");
res.redirect("/shop");
});

router.get("/cart",isloggedin,async(req,res)=>{
    console.log(req.user);
let user =await usermodel
.findOne({email:req.user.email})
.populate("cart");
const bill =Number(user.cart[0].price+20)-Number(user.cart[0].discount);
res.render("cart",{user,bill});
});




module.exports=router;