const Product=require('../models/product');
// controller for showing all products if there there are zero product in database it will show  'No product found'
module.exports.index= async function(req,res){
  try{
    console.log("Showing product");
    const products = await Product.find({})
      if(products.length<1){
        res.status(200).json({
            message: 'No product found'
        })
        return
    }
       if(products){
        res.status(200).json({
            data: products
        })
    }   
}catch(err){
        res.status(404).json({
            message: "There was an error in finding products"
        })
}
  }
// add new product in database
module.exports.create = async function(req,res){
  console.log(req.body)
  try{

      console.log(req.body);
      console.log("adding product");
      let product = await Product.create(req.body);
      res.status(200).json({    // status 200 for sucessful creation of product
          data:{
              product
          }
      })

  }catch(err){
      console.log(req.body);
      console.log(err);
      res.status(400).json({
          data:{
              msg: "there was an error in crating new product"
          }
      })
  }
}

//  Controller for deleting a product 

module.exports.delete = async function(req,res){
  console.log(req.params.id);
try{
    let product=await Product.findByIdAndDelete(req.params.id);
    console.log(product);
    return res.status(200).json({
                 message:"product deleted"
              })
}
  catch(err){

      res.status(404).json({
          message: "There was an error in finding products"
      })
  }
}
// Controller for updating product quantity with help of product id you can increase or dercrease quantity
module.exports.update = async function(req,res){
    try{
        const {
            id: productID
        }=req.params
        const {
            number
        }=req.query

        if(!number){
            res.status(400).json({
                data:{
                    message: "Error in updating quantity"
                }
            })
            return
        }

        const product = await Product.findOne({
            _id: productID
        })

        let newQuantity = product.quantity + (+number)

        if(newQuantity>0){
            const updateProduct = await Product.findByIdAndUpdate({
            _id: productID
            },{
                quantity: newQuantity
            },{
                new: true,
                runValidators: true
            })

            res.status(200).json({
                data:{
                    updateProduct,
                    message: "successfully updated"
                }
            })
        }else{
            res.status(400).json({
                data:{
                    message:"Product quantity can not be zero ot less"
                }
            })
            return
        }

    }catch(err){
        console.log(err,"error in updating");
        res.status(400).json({
            data:{
                message: "Error while updating quantity"
            }
        })
    }
}