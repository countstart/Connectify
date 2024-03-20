const express = require('express')
const Router = express.Router()
const expressAsyncHandler = require('express-async-handler')
const {loginController,registerController, fetchAllUsers, fetchRequestSent, updateRequestRecieved, fetchRequestRecieve, acceptFriend, fetchFriends, fetchFriendsChatId, fetchAllMessages,updateMessages, fetchMyUploads, uploadMyContent} = require('../controllers/userController')
const { protect } = require('../middlewares/authmiddleware')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../ChatApp/public/backendImages/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
});

const upload = multer({ storage: storage });


Router.post("/login",loginController)
Router.post("/register",registerController)
Router.get("/all-users",protect,fetchAllUsers)
Router.get("/friendrequest",protect,fetchRequestSent)
Router.post("/request-sent",protect,updateRequestRecieved)
Router.get("/friendrequestrecieve",protect,fetchRequestRecieve)
Router.post("/request-recieve",protect,acceptFriend)
Router.get("/my-friends",protect,fetchFriends)
Router.post("/fetchFriendsChatId",protect,fetchFriendsChatId)
Router.post("/fetchAllMessages",protect,fetchAllMessages)
Router.post("/updateMessages",protect,updateMessages)
Router.post("/uploadContent",protect,upload.single("image"),uploadMyContent)
Router.get("/fetchMyUploads",protect,fetchMyUploads)

module.exports = Router