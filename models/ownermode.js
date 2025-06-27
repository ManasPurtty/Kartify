const e = require('express');
const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
   
    fullname:
    {type:String,
        minLength:3,
        trim:true
    },
    email:
    {type:String,
        minLength:3,
    },
    password:
    {type:String,
        minLength:3,
    },
 

    prodcts:{
        type:Array,
        default:[]  
    },
   
    picture:String,
    gstin:String
})

module.exports = mongoose.model('owner', ownerSchema);