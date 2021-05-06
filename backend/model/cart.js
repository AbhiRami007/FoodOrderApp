const mongoose=require('mongoose');
const subitems = require('./subitems');
const Schema=mongoose.Schema;

const Cart=new mongoose.Schema({
    cart:[{
        type:Schema.Types.ObjectId,
        ref:"Subitems"
    }]
})
module.exports=mongoose.model('Cart',Cart);