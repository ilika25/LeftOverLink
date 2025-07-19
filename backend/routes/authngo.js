//for handling user authentication -login and register
const express= require('express');
const router= express.Router();
const Ngo= require('../models/Ngo');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const SECRET_KEY= process.env.JWT_SECRET;
const verifyToken = require('../middleware/verifyToken');

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const ngo = await Ngo.findById(req.user._id).select('-password');
    if (!ngo) return res.status(404).json({ error: 'Ngo not found' });
    res.status(200).json(ngo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/register',async(req,res)=>{
    let {NgoName,password,address,phone,email}= req.body;
    try{
        NgoName = NgoName.trim().toLowerCase();
        email = email.trim().toLowerCase();
        const existingNgo= await Ngo.findOne({email});
        if(existingNgo)
            return res.status(400).json({error:"Ngo already exists"});
        const hashedPassword= await bcrypt.hash(password,10);
        const newNgo= new Ngo({
            NgoName,
            password:hashedPassword,
            address,
            phone,
            email
        });
        await newNgo.save();
        res.status(201).json({message:'Ngo registered successfully!'});
    }catch(err){
        res.status(500).json({error:'Server error'});
    }
});
router.post('/login', async (req, res) => {
  let { NgoName, email, password } = req.body;

  try {
    NgoName = NgoName.trim().toLowerCase();
    email = email.trim().toLowerCase();

    const ngo = await Ngo.findOne({ email });
    if (!ngo) {
      return res.status(400).json({ error: 'NGO not found' });
    }

    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    if (NgoName !== ngo.NgoName.toLowerCase()) {
      return res.status(400).json({ error: 'Incorrect NGO Name' });
    }

    const token = jwt.sign(
      {
        _id: ngo._id,
        email: ngo.email,
        NgoName: ngo.NgoName,
        role: "ngo"
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    // ✅ Return token and optionally role
    res.status(200).json({
      message: 'Login successful',
      token,
      role: 'ngo',
      NgoName: ngo.NgoName
    });

  } catch (err) {
    console.error("NGO Login Error:", err.message);
    res.status(500).json({ error: 'Server error during NGO login' });
  }
});

module.exports = router;
module.exports= router;
