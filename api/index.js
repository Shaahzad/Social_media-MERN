const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userrouter = require("./Route/user")
const authrouter = require("./Route/auth")
const postrouter = require("./Route/post")
const cors = require('cors');
const multer = require('multer')
const path = require('path')

dotenv.config();

const Dbconnect = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } 
  catch (error) {
    console.log(error);
  }
}
Dbconnect();

app.use("/images", express.static(path.join(__dirname, "public/images")))

// middleware
app.use(cors()); // CORS middleware ko pehle use karein
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination: (req,file,cb) =>{
    cb(null,"public/images")
  },
  filename: (req,file,cb)=>{
  cb(null, req.body.name)
  }
})

const upload = multer({storage});
app.post("/api/upload/", upload.single("file"), (req,res)=>{
  try {
    return res.status(200).json("File uploaded successfully")
  } catch (error) {
    console.log(error);
  }
})

app.use("/api/user", userrouter)
app.use("/api/auth", authrouter)
app.use("/api/post", postrouter)

app.listen(8800,()=>{
    console.log("Backend server is running!");
})
