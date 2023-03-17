const express=require('express');
const router=express.Router();
router.use('/products',require('./products'));




// we are exporting it so that index.js can use it
module.exports=router;