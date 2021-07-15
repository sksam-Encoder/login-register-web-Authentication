require('dotenv').config()
const express = require("express")
require("./Db/conn")
const Registers = require("./models/Registers")
const bcrypt = require("bcryptjs")
const app = express()
const path = require("path")
const hbs = require("hbs")

const port = process.env.PORT || 3000
const static_path = path.join(__dirname, "../public")
const Views_path = path.join(__dirname, "../Template/views")
const partials_path = path.join(__dirname, "../Template/partials")
app.use(express.static(static_path));
app.use(express.static(Views_path));
app.set('view engine',"hbs") // by using this i considered that i am using view engine of hbs
app.set("views",Views_path)
hbs.registerPartials(partials_path);
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const router = require("./router/users")
app.use(router)




app.listen(port,()=>{ 
 
console.log(`server is running at port ${port}`)

},)