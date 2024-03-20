const express = require("express")
const mongoose = require('mongoose')

const messageModel = mongoose.Schema({
    chatid : {
        type : String,
        required : true
    },
    chats: [
        {
            name: {
                type: String,
            },
            message: {
                type: String,
            }
        }
    ]
},
{
    timestamp :true
})

const Message = mongoose.model("Message",messageModel)
module.exports = Message 