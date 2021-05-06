const mongoose=require('mongoose');
// bring the cateory object here
const schema=mongoose.Schema;
const subitemsdata=require('./subitemsdata')
// define category, start with capital
const Result=new mongoose.Schema({
    result:[{
        name:{type:String},
        image:{type:String},
        subitemsdata:{
            type:schema.Types.ObjectId,
            ref: "Subitemsdata" //js file can have more then one schema
        }

}]
});

// export the schema
module.exports=mongoose.model('Result',Result);