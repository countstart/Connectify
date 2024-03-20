const express = require('express');
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const expressAsyncHandler = require('express-async-handler')
const generateToken = require('../config/generateToken')
const { v4: uuidv4 } = require('uuid');

const registerController = expressAsyncHandler ( async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        // res.sendStatus(404)
        throw new Error("All fileds are mandatory.")
        res.end("All fields are mandatory.")
    }

    const userExist = await User.findOne({email})
    if(userExist){
        res.sendStatus(405)
        throw new Error("Account with this email already exist.")
        res.end("Account with this email is already exist.")
    }

    const userName = await User.findOne({username})
    if(userName){
        res.sendStatus(406)
        throw new Error("This username is already taken.")
        res.end("This username is already taken.")
    }
    
    const userCreated = await User.create({
        username,
        email,
        password
    }) 
    if(userCreated){
        res.json({
            _id : userCreated._id,
            name : userCreated.username,
            email : userCreated.email,
            isAdmin : userCreated.isAdmin,
            token : generateToken(userCreated._id)
        })
    }
    else{
        // res.sendStatus(500)
        throw new Error("User not created.")
    }

})
const loginController = expressAsyncHandler(async (req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        throw new Error("All fields are mandatory.")
    }

    const userFound = await User.findOne({username})
    if(userFound && userFound.matchPassword(password)){
        res.json({
            _id : userFound._id,
            username : userFound.username,
            email : userFound.email,
            isAdmin : userFound.isAdmin,
            token : generateToken(userFound._id)
        })
        console.log(username)
    }
    else{
        throw new Error("This user doesn't exists.")
    }
})

const fetchAllUsers = expressAsyncHandler(async (req,res)=>{
    const name = req.user.username;
    const users = await User.find({
        username : { $ne : name }
    }).select("username")
    // console.log(users)
    res.send(users);
})

const fetchRequestSent = expressAsyncHandler( async (req,res)=>{
    const name = req.user.username;
    const requestSent =  await User.find({username : name})
    // console.log(requestSent[0].requestsent);
    res.send(requestSent[0].requestsent);
})

const fetchRequestRecieve = expressAsyncHandler(async (req,res)=>{
    const name = req.user.username;
    const requestRecieve =  await User.find({username : name})
    // console.log(requestRecieve[0].requestreceive)
    res.send(requestRecieve[0].requestreceive);
})

const updateRequestRecieved = expressAsyncHandler(async (req,res)=>{
    const sendBy = req.user.username;
    const sendTo = req.body.name;

    const senderObj = await User.find({username:sendBy})
    const receiverObj = await User.find({username:sendTo})

    await senderObj[0].requestsent.map((user)=>{
        if(user===sendTo){
            res.json({
                sendBy,
                sendTo
            })
            console.log("Request is already sent");
            throw new Error("request is already sent.")
        }
    })

    await User.updateOne({username : sendBy},{ $push: { requestsent: sendTo } })
    await User.updateOne({username : sendTo},{ $push: { requestreceive: sendBy } })

    res.json({
        sendBy,
        sendTo
    })
})

const acceptFriend = expressAsyncHandler(async (req,res)=>{
    const uniqueID = uuidv4();

    const sendBy = req.body.name
    const acceptBy = req.user.username

    //delete from requestrecieve from reciever database
    await User.updateOne({username:acceptBy},{$pull : {requestreceive : sendBy}})
    await User.updateOne({username:acceptBy},{$pull : {requestsent : sendBy}})
    
    //add to friend of both the parties
    await User.updateOne({username:acceptBy},{$addToSet : {friends : {name : sendBy,chatid : uniqueID}}})
    await User.updateOne({username:sendBy},{$addToSet : {friends : {name : acceptBy ,chatid : uniqueID}}})
    
    //delete from requestsent from sender database
    await User.updateOne({username: sendBy},{$pull : {requestsent : acceptBy}})
    await User.updateOne({username:sendBy},{$pull : {requestreceive : acceptBy}})

    await Message.create({
        chatid: uniqueID,

    })

    console.log("Request accepted. You guys are now friends !!")
    res.json({
        acceptBy,
        sendBy
    })
})

const fetchFriends = expressAsyncHandler(async(req,res)=>{
    const name = req.user.username;
    const user = await User.find({username : name})
    // console.log(user);
    // console.log(user[0].friends)
    res.send(user[0].friends);
})

const fetchFriendsChatId = expressAsyncHandler( async(req,res)=>{
    const name = req.user.username;
    const friend = req.body.name;

    const result = await User.findOne({username:name , 'friends.name':friend} , {'friends.$': 1, _id: 0})
    const chatid = result.friends[0].chatid;
    // console.log(chatid);
    res.send(chatid)

})

const fetchAllMessages = expressAsyncHandler( async(req,res)=>{
    const chid = req.body.chid
    console.log(chid)
    const messageObj = await Message.findOne({chatid:chid})
    const chats = messageObj.chats
    // console.log(chats)
    res.send(chats)
})

const updateMessages = expressAsyncHandler(async (req,res)=>{
    const chat_id = req.body.chat_id;
    const newMessage = req.body.msg;
    // console.log(chat_id,newMessage)
    await Message.updateOne({chatid : chat_id},{$push: { chats: newMessage }})
    res.send("done")
})


const fetchMyUploads = expressAsyncHandler(async(req,res)=>{
    const username = req.user.username;
    try {
        const userObj = await User.findOne({username : username});
        res.send(userObj.myuploads);
    } catch (error) {
        console.log(error)
        res.send(false)
    }
})
const uploadMyContent = expressAsyncHandler(async(req,res)=>{
    const username = req.user.username;
    const imageName = req.file.filename;
    const title = req.body.title
    const description = req.body.desc

    try {
        await User.updateOne({username:username},{$push : {myuploads : {
            image : imageName,
            title : title,
            description : description
        }}})
        res.send("uploaded")
    } catch (error) {
        console.log(error);
    }
})

module.exports = {
    loginController,
    registerController,
    fetchAllUsers,
    fetchRequestSent,
    updateRequestRecieved,
    fetchRequestRecieve,
    acceptFriend,
    fetchFriends,
    fetchFriendsChatId,
    fetchAllMessages,
    updateMessages,
    fetchMyUploads,
    uploadMyContent
}