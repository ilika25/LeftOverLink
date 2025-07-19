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
router.post('/interest/:id', verifyToken, async (req, res) => {
  try {
    const ngoId = req.user._id;
    const donationId = req.params.id;

    if (!ngoId) {
      return res.status(401).json({ error: 'NGO ID missing in token' });
    }

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Ensure it's an array
    if (!Array.isArray(donation.interestedNgos)) {
      donation.interestedNgos = [];
    }

    // Check if NGO already expressed interest
    const alreadyInterested = donation.interestedNgos.some(
      id => id.toString() === ngoId.toString()
    );

    if (!alreadyInterested) {
      donation.interestedNgos.push(ngoId); // <-- ONLY updates array, does not create new doc
      await donation.save();
      console.log("✅ NGO interest saved for donation:", donationId);
    } else {
      console.log("ℹ️ NGO already expressed interest.");
    }

    res.status(200).json({ message: 'Interest registered successfully' });
  } catch (err) {
    console.error("🔥 Error in /donation/interest/:id", err.message);
    res.status(500).json({
      error: 'Server error expressing interest',
      details: err.message
    });
  }
});

// POST /donation/approve/:id
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

    const updatedDonation = await Donation.findById(donation._id)
      .populate('claimedBy', 'NgoName')
      .populate('interestedNgos', 'NgoName address');

    res.status(200).json({ message: 'NGO approved', donation: updatedDonation });

  } catch (err) {
    console.error("❌ Error in approving NGO:", err.message);
    res.status(500).json({ error: 'Server error approving NGO' });
  }
});

router.get('/my-donations', verifyToken, async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .populate('interestedNgos', 'NgoName address')
      .populate('claimedBy', 'NgoName address')
      .sort({ submittedAt: -1 });

    res.status(200).json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching your donations' });
  }
});

router.post(
    '/submit',
    verifyToken,
    upload.single('image'),
    async(req,res)=>{
        try{
          if (req.user.role !== 'donor') {
              return res.status(403).json({ error: 'Only donors can submit donations' });
            }
            const {foodType,description,quantity,pickupAddress}= req.body;
            const donorId= req.user._id;
            console.log(donorId);
            const donation= new Donation({
                donor: donorId,
                foodType,
                description,
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