import { uploadOnCloudinary } from "../libs/cloudinary.js";
import { getReceiverSocketId, io } from "../libs/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserFromSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filterUsers = await User.find({
      _id: { $ne: loggedUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("error in getting User from the sidebar", error.message);
    res.status(500).json({ message: "internal server errors" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userTochatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userTochatId },
        { senderId: userTochatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getting the messages", error.message);
    res.status(500).json({ message: "error in getting the messages" });
  }
};

export const sendMessages = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const picture = req.files?.chatPicture[0]?.path;
    let imageUrl;
    if (picture && req?.files) {
      const uploadPicture = await uploadOnCloudinary(picture);
      imageUrl = uploadPicture.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverId) {
      io.to(receiverId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error");
    res.status(400).json({ message: "error in sending the message" });
  }
};
