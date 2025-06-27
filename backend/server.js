const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors'); //cross origin resource sharing,security feature to restrict web page making request to different domain
require('dotenv').config();
const app= express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Mongodb successfully connected'))
    .catch((err)=>console.log(err));

app.use('/donor',require('./routes/authdonor'));
app.use('/ngo',require('./routes/authngo'));

const port= 3000;
app.listen(port,()=>console.log(`Server listening on port ${port}`));