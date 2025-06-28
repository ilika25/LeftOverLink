const mongoose= require('mongoose');

const donationSchema= new mongoose.Schema({
    donor: {type: mongoose.Schema.Types.ObjectId,ref:'Donor',required:true},
    foodType: {type:String,required:true},
    quantity: {type:String,required:true},
    pickupAddress:{type:String,required:true},
    image:{type: String},
    submittedAt:{type:Date, default:Date.now}
});

module.exports= mongoose.model('Donation',donationSchema);