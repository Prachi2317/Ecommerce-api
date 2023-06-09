const express=require('express');
const app= express();
const port=8001;
const db=require('./config/mongoose');
  app.use(express.json());
// use express router
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port no: ${port}`);
})
