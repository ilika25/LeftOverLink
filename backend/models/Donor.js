const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    DonorName: { type: String, required: true },
    password: { type: String, required: true },
    organisation: { type: String },
    phone: { type: Number,required:true,unique:true },
    email: { type: String, required: true, unique: true,lowercase:true},
    address: { type: String }
});

module.exports = mongoose.model("Donor", donorSchema);
