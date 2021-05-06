const mongoose=require('mongoose');
// bring the cateory object here
const schema=mongoose.Schema;
const subitems=require('./subitems')
// define category, start with capital
const Subitemsdata=new mongoose.Schema({
    name:{type:String},
    subitems:{
        type:schema.Types.ObjectId,
        ref: "Subitems" //js file can have more then one schema
    },

});

// export the schema
module.exports=mongoose.model('Subitemsdata',Subitemsdata);