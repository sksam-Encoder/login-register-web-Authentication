const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const employeeSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true

    },
    uname: {

        type: String,
        unique: true,
        required: true


    },
    email: {

        type: String,
        required: true,
        unique: true,
        validate: {

            validator: function (value) {

                return (validator.isEmail(value))


            },
            message: "email is not correct"

        }

    },
    phone: {

        type: Number,
        required: true,
        unique: true,




    }
    ,
    password: {

        type: String,
        required: true,


    }

    ,
    confirmPassword: {

        type: String,
        required: true


    },

    tokens: [{                                     

         token: {

            type: String,
            required: true


        }

    }]



})
// generating Tokens for user
employeeSchema.methods.generateAuthToken = async function () {

    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString },process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token })

        await this.save()

        return token
    } catch (e) {

        res.send("in error emplyeeScheema" + e)
        console.log(e);

    }



}





employeeSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = await bcrypt.hash(this.password, 10);

        //  for security c- password we need to hide
        next();

    }
})

// create collection

const Registers = new mongoose.model("Register", employeeSchema);

module.exports = Registers