const express=require('express');
const router=express.Router(); //api generations

const Cart=require('../model/cart');
const Subitems=require('../model/subitems');
const Subitemsdata=require('../model/subitemsdata');
const Result=require('../model/result');
// for Db its better to keep names with capital letter not necessary
const {get}=require('mongoose');
const subitems = require('../model/subitems');

// routes creation
router.get('/items/get',async (req,res)=>{
    try{
        const get=await Result.find();
        res.json(get)
    }catch(err){
        message:err
    }
})

router.get('/subitems/get/:id',async (req,res)=>{
    try{
        const subget=await Subitems.find({_id:req.params.id});
        res.json(subget)
    }catch(err){
        message:err
    }
})

router.get('/subitemsdata/get/:id',async (req,res)=>{
    try{
        const subgetdata=await Subitemsdata.find({_id:req.params.id});
        res.json(subgetdata)
    }catch(err){
        message:err
    }
})

router.post('/subitems/creation',async(req,res)=>
{
    const post=await Subitems();
    try{
        const savePost=await post.save();
        res.json(savePost);
    }
    catch(err)
    {
        res.json({message:err})
    }
});


router.post('/subitems/:id',async (req,res)=>
{
   const item={
       name:req.body.name,
        image:req.body.image,
        price:req.body.price,
        description:req.body.description
    }
    // const cat=await Medicine.findById(req.params.id);
    const post=await Subitems.findByIdAndUpdate(req.params.id,{
        $addToSet:{
            subitems:item
        }
    })
    try{
        const savePost=await post.save();
        res.json(savePost);
    }
    catch(err)
    {
        res.json({message:err})
    }
})

router.post('/subitemsdata/:itemid',async(req,res)=>
{
    const sub=await Subitems.findById(req.params.itemid);
    const post=new Subitemsdata({
        name:req.body.name,
        subitems:sub
    })
    try{
        const savepost=await post.save();
        res.json(savepost);
    }
    catch(err)
    {
        res.json({message:err})
    }
})


router.post('/result/creation',async(req,res)=>
{
    const post=await Result();
    try{
        const savePost=await post.save();
        res.json(savePost);
    }
    catch(err)
    {
        res.json({message:err})
    }
});

router.post('/result/:resultid/:subid',async (req,res)=>
{
    const subdata=await Subitemsdata.findById(req.params.subid);
    const resultdata={
       name:req.body.name,
        image:req.body.image,
        subitemsdata:subdata
        
    }
    
    // const cat=await Medicine.findById(req.params.id);
    const post=await Result.findByIdAndUpdate(req.params.resultid,{
        $addToSet:{
            result:resultdata,
            
        }
    })
    try{
        const savePost=await post.save();
        res.json(savePost);
    }
    catch(err)
    {
        res.json({message:err})
    }
})



// cart is empty in the begining
router.post('/cart/creation',async(req,res)=>
{
    const post=await Cart();
    try{
        const savePost=await post.save();
        res.json(savePost);
    }
    catch(err)
    {
        res.json({message:err})
    }
});


// Updating the cart
router.post('/cart/:cartid/:itemid',async (req,res)=>
{
   
    const sub=await Subitems.find({_id:req.params.itemid});
    const post=await Cart.findByIdAndUpdate(req.params.cartid,{
        $addToSet:{
            cart:sub
        }
    })
    try{
        const savePost=await post.save();
        res.json(savePost);
    }
    catch(err)
    {
        res.json({message:err})
    }
})

router.get('/cart/get/:cartid/:itemid',async (req,res)=>{
    try{
        const get=await Cart.findById(req.params.cartid).populate("cart");
        res.json(get)
    }catch(err){
        message:err
    }
})

// to delete cart items
router.post('/cart/remove/:cartid',async(req,res)=>
{
    // const cat=await Medicine.findById(req.params.id)
    const post=await Cart.findOneAndUpdate(req.params.cartid,{
        $set:{
            cart:[]
        }
    })
    try{
        const savePost= await post.save(savePost);
        res.json(savePost);
    }
    catch(err)
    {
        res.json({message:err})
    }
})



module.exports=router