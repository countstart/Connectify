const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const {Server} = require('socket.io')
const {createServer} = require('http')
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const frontendURL = "https://connectify-indol.vercel.app";

app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST"],
        credentials: true,
    })
)

app.options('*', 
    cors()
);

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["*"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(express.urlencoded({extended:true}))
app.use('/static', express.static(__dirname + '../ChatApp/src/backendImages'));

app.use(express.json())


const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(`${process.env.MONGO_URL}`)
        if(connect){
            console.log("MongoDB is connected.");
        }
        else{
            throw(err);
        }
    }
    catch(err){
        console.log("Database is connected.",err.message);
    }

}

connectDB()

app.use("/user",userRoutes)

app.get('/',(req,res)=>{
    res.json({
        message : "this is the home screen"
    })
})

io.on("connection",(socket)=>{
    console.log("user connected with socket ID ", socket.id)

    socket.on("join-chat",(chatid)=>{
        socket.join(chatid)
    })

    socket.on("message-sent",(data)=>{
        console.log("received")
        socket.to(data.chat_id).emit("message-recieve",data);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})