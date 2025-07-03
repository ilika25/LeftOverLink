const mongoose= require('mongoose');

const donationSchema= new mongoose.Schema({
    donor: {type: mongoose.Schema.Types.ObjectId,ref:'Donor',required:true},
    foodType: {type:String,required:true},
    quantity: {type:String,required:true},
    pickupAddress:{type:String,required:true},
    image:{type: String},
    claimedBy:{type:mongoose.Schema.Types.ObjectId,ref:'Ngo',default:null},
    interestedNgos:[{type:mongoose.Schema.Types.ObjectId,ref:'Ngo'}],
    status:{type:String,enum:['available','claimed','completed'], default:'available'},
    submittedAt:{type:Date, default:Date.now}
});

module.exports= mongoose.model('Donation',donationSchema);