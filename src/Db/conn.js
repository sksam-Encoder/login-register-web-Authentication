const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ecom",{
useNewUrlParser: true,
useCreateIndex : true,
useUnifiedTopology: true

}).then(()=>{

console.log("conn sucessfull through mnogoose")

}).catch((e)=>{
 
    console.log(e);

})