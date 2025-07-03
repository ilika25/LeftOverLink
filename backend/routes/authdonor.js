//for handling user authentication -login and register
const express= require('express');
const router= express.Router();
const Donor= require('../models/Donor');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const SECRET_KEY= process.env.JWT_SECRET;
const verifyToken = require('../middleware/verifyToken');

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const donor = await Donor.findById(req.user._id).select('-password');
    if (!donor) return res.status(404).json({ error: 'Donor not found' });
    res.status(200).json(donor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
router.post('/register',async(req,res)=>{
    let {DonorName,password,organisation,phone,email,address}= req.body;
    try{
        email= email.trim().toLowerCase();
        const existingDonor= await Donor.findOne({email});
        if(existingDonor)
            return res.status(400).json({error:"Donor already exists"});
        const hashedPassword= await bcrypt.hash(password,10);
        const newDonor= new Donor({
            DonorName,
            password:hashedPassword,
            organisation,
            phone,
            email,
            address
        });
        await newDonor.save();
        res.status(201).json({message:'User registered successfully!'});
    }catch(err){
        res.status(500).json({error:'Server error'});
    }
});
router.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    try{
        const donor= await Donor.findOne({email});
        if(!donor){
            return res.status(400).json({error:'Donor not found'});
        }
        const isMatch= await bcrypt.compare(password,donor.password);
        if(!isMatch){
            return res.status(400).json({error:'Password do not match'});
        }
        const token= jwt.sign(
            {_id:donor._id.toString(),email:donor.email,role:"donor"},
            SECRET_KEY,
            {expiresIn: "2h"}
        );
        res.status(200).json({message:'Login Successful',token});
    }catch(err){
        res.status(500).json({error:'Server error'});
    }
});
module.exports= router;
