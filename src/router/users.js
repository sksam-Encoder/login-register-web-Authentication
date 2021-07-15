const express  = require("express")
const Registers = require("../models/Registers")
const bcrypt = require("bcryptjs")

const  router = new express.Router();

router.post("/about", async (req, res) => {

    try {

        const passwd = req.body.password;
        const c_passwd = req.body.confirmPassword;
        if (passwd === c_passwd) {
            console.log(req.body.name)
            console.log(req.body.uname)
            console.log(req.body.email)
            console.log(req.body.phone)
            console.log(req.body.password)
            console.log(req.body.confirmPassword)

            const registeremp = new Registers({
                name: req.body.name,
                uname: req.body.uname,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            });

            console.log("1st part" + registeremp);

            // pass Hasing

            // creating tokens

            const token = await registeremp.generateAuthToken();
            console.log("Register Tokens   " + token)


            const result = await registeremp.save();
            res.status(201).render("index")

        } else {
            res.send(`password are not matched ${passwd} ${c_passwd}`);
        }
   } catch (e) {

        console.log("the error part page")
        res.status(400).send(e);
    }
})

router.get("/", (req, res) => {

    res.render("index")

})

router.get("/about", (req, res) => {

    res.render("about");

})

// 
router.post("/login", async (req, res) => {

    try {
        const email = req.body.email;
        const pass = req.body.password;
        const result = await Registers.findOne({ email })

        const passMatch = await bcrypt.compare(pass, result.password)

        const token = await result.generateAuthToken();
        console.log("Logins Tokens =  " + token)

        if (passMatch) {

            res.status(201).render("index");
        }
        else {
            res.status(400).send("invalid login details");
        }

    } catch (e) {
        res.status(400).send(e)
    }


})

// // const bcrypt =  require("bcryptjs");


// // const securePassword = async(password)=>{

// // const passhash = await bcrypt.hash(password,10);

// // //password matching

// // const passMatch =  await bcrypt.compare("sam12",passhash);

// // console.log(passhash);

// // console.log(passMatch);

// // }



// securePassword("sam123");



// //  json web token

// const jwt = require("jsonwebtoken")

// // craeting a signature
// const createtoken = async() =>{

// const token =  jwt.sign({_id :"1234"}, "mynameissksamandiknowbetterwhoisrichestintheworld")

// //  server verificatiom


// const userVerify = jwt.verify(token,"mynameissksamandiknowbetterwhoisrichestintheworld")

// console.log(token)

// console.log(userVerify);

// }

// createtoken();

module.exports = router;