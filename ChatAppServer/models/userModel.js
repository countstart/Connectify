const mongoose = require('mongoose');
const bcyrpt = require('bcrypt')
const userModel = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    friends : [
        {
            name : {
                type : String,
                required : true
            },
            chatid : {
                type : String,
                required : true
            }
        }
    ],
    requestsent : {
        type : [String]
    },
    requestreceive : {
        type : [String]
    },
    myuploads : [
        {
            image: {
                type: String, 
            },
            title: {
                type: String,
            },
            description: {
                type: String,
            }
        }
    ]

},{
    timestamps : true
})


userModel.methods.matchPassword = async function(enteredPassword){
    return await bcyrpt.compare(enteredPassword,this.password);
}

userModel.pre("save",async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcyrpt.genSalt(10);
    this.password = await bcyrpt.hash(this.password,salt);
})

const User = mongoose.model('User',userModel);
module.exports = User