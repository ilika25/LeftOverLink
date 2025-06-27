const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
    NgoName: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: Number,required:true,unique:true },
    email: { type: String, required: true, unique: true,lowercase:true}
});

module.exports = mongoose.model("Ngo", ngoSchema);
