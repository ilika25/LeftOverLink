const express= require('express');
const router= express.Router();
const Donation= require('../models/Donation');
const verifyToken= require('../middleware/verifyToken');
const upload= require('../middleware/upload');

router.post(
    '/submit',
    verifyToken,
    upload.single('image'),
    async(req,res)=>{
        try{
            const {foodType,quantity,pickupAddress}= req.body;
            const donorId= req.user.id;
            const donation= new Donation({
                donor: donorId,
                foodType,
                quantity,
                pickupAddress,
                image: req.file?req.file.filename : null
            });
            await donation.save();
            res.status(201).json({message:`Donation submitted succesfully`});
        }catch(err){
            console.error(err);
            res.status(500).json(`Server error while submitting donation`);
        }
    }
);
module.exports= router;