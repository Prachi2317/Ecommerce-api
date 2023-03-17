const express= require('express');
const router=express.Router();
const productController=require('../controllers/product_controller')

router.get('/',productController.index);
router.post('/create',productController.create);
router.delete('/delete/:id',productController.delete);
router.post('/update/:id',productController.update);
router.post('/:id/update_quantity',productController.update);
module.exports=router;