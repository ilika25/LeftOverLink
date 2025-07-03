const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors'); //cross origin resource sharing,security feature to restrict web page making request to different domain
require('dotenv').config();
const app= express();
const http= require('http');
const {Server}= require('socket.io');
const server= http.createServer(app);
const io= new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST']
    }
});
app.set('io',io);
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('Mongodb successfully connected'))
    .catch((err)=>console.log(err));

app.use('/uploads', express.static('uploads'));
app.use('/donor',require('./routes/authdonor'));
app.use('/ngo',require('./routes/authngo'));
app.use('/donation',require('./routes/donationRoutes'));

io.on('connection',(socket)=>{
    console.log(`NGO or client connected`,socket.id);
    socket.on('disconnect',()=>{
        console.log(`Disconnected`,socket.id);
    });
});

const port= 3000;
server.listen(port,()=>console.log(`Server listening on port ${port}`));