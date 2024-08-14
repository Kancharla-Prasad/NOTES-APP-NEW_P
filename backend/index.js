import express from "express";
import mongoose  from "mongoose";
import { mongoDBURL,PORT } from "./config.js";
import cors from 'cors';
import router1 from "./routes/userRoutes.js";
import router2 from "./routes/noteRoutes.js";


//creating app for express
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users',router1);
app.use('/api/notes',router2);







//creating a port for this app
mongoose.connect(mongoDBURL)
.then(
    app.listen(PORT,()=>{
    console.log(`Server is Running in the port:${PORT}`);
})
)
