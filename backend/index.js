const express = require('express');
const app=express();
const cors=require('cors');

// require('dotenv').config();

const port=5000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());
const postRoutes=require('./controller/controller');
app.use('/',postRoutes);


const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/foodorder",
{ useNewUrlParser: true ,
 useUnifiedTopology: true,
useFindAndModify:false})
.then(()=>{
    console.log("DB Connected");
})

app.listen(port,()=>
{
    console.log(`Server listening on Port ${port}`)
})