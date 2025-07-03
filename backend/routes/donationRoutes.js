const express= require('express');
const router= express.Router();
const Donation= require('../models/Donation');
const verifyToken= require('../middleware/verifyToken');
const upload= require('../middleware/upload');

router.get('/active',async(req,res)=>{
    try{
        const donations= await Donation.find({status: 'available'}).populate('donor','DonorName organisation').sort({submittedAt:-1});
        res.status(200).json(donations);
    }catch(err){
        console.error(err);
        res.status(500).json({error: `Server error fetching donations`});
    }
})
router.post('/interest/:id',verifyToken,async(req,res)=>{
    try{
        const donation= await Donation.findById(req.params.id);
        if(!donation) return res.status(400).json({error:'Donation not found'});

        if(!donation.interestedNgos.includes(req.user_id)){
            donation.interestedNgos.push(req.user_id);
            await donation.save();
        }
        res.status(200).json({message:'Interest registered'});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Server error'});
    }
})
// POST /donation/approve/:id
router.post('/approve/:id', verifyToken, async (req, res) => {
    const { ngoId } = req.body;
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) return res.status(404).json({ error: 'Donation not found' });
        if (donation.claimedBy) return res.status(400).json({ error: 'Already claimed' });

        donation.claimedBy = ngoId;
        donation.status = 'claimed';
        await donation.save();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error approving NGO' });
    }
});

router.post(
    '/submit',
    verifyToken,
    upload.single('image'),
    async(req,res)=>{
        try{
            const {foodType,quantity,pickupAddress}= req.body;
            const donorId= req.user._id || req.user.id;
            const donation= new Donation({
                donor: donorId,
                foodType,
                quantity,
                pickupAddress,
                image: req.file?req.file.filename : null
            });
            await donation.save();
            const populatedDonation = await Donation.findById(donation._id).populate('donor', 'DonorName organisation');
            //after donation is saved emit to all NGO
            const io= req.app.get('io');
            io.emit('new-donation',populatedDonation);
            res.status(201).json({message:`Donation submitted succesfully`});
        }catch(err){
            console.error(err);
            res.status(500).json(`Server error while submitting donation`);
        }
    }
);
module.exports= router;