const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Subitems=new mongoose.Schema({
        name:{type:String},
        image:{type:String},
        price:{type:String},
        description:{type:String}
})
module.exports=mongoose.model('Subitems',Subitems);