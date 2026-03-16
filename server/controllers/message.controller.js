import Message from "../models/message.models.js";
import Conversation from "../models/conversation.models.js";
import User from "../models/user.models.js";
import AppError from "../utils/AppError.js";
import WrapAsync from "../utils/WrapAsync.js";
import ApiResponse from "../utils/ApiResponse.js";
import { io, socketMap } from "../socket/socket.js";


// ===================== SEND MESSAGE =====================
export const sendMessage = WrapAsync(async (req, res, next) => {
    const senderId = req.user.id;
    const receiverId = req.params.receiverId;
    const { message } = req.body;

    

    if (!senderId || !receiverId) {
        return next(new AppError(400, "Missing required fields"));
    }

    if (!message) {
        return next(new AppError(400, "Message is required"));
    }

    // create message
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    });

    // find conversation
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    });

    // create if not exists
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
            messages: [newMessage._id]
        });
    } else {
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    // socket emit to receiver
    const socketReceiverId = socketMap[receiverId];
    if (socketReceiverId) {
        io.to(socketReceiverId).emit("message", newMessage);
    }

    res.status(201).json(
        new ApiResponse(201, newMessage, "Message sent successfully")
    );
});


// ===================== GET MESSAGES =====================
export const getMessages = WrapAsync(async (req, res, next) => {

    const senderId = req.user.id
    const recieverId = req.params.recieverId

    console.log(senderId, recieverId)

    const conversation = await Conversation
  .findOne({
    participants: { $all: [senderId, recieverId] }
  })
  .populate("messages");


    if (!conversation) {
        return res.status(200).json(
            new ApiResponse(200, [], `No messages yett between ${senderId} and ${recieverId}`)
        )
    }

    res.status(200).json(
        new ApiResponse(200, conversation.messages, "Messages fetched successfully")
    )
})


// ===================== GET USERS =====================
export const getUsers = WrapAsync(async (req, res, next) => {

    const userId = req.user.id;
    console.log(userId)

    if (!userId) {
        return next(new AppError(401, "Unauthorized"));
    }

    const users = await User.find(
        { _id: { $ne: userId } },
        "username profilePic email"
    );

    res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});


// ===================== DELETE MESSAGE =====================
export const deleteMessage = WrapAsync(async (req, res, next) => {

    const { messageId, otherUserId } = req.params;

    if (!messageId || !otherUserId) {
        return next(new AppError(400, "Missing required fields"));
    }

    const message = await Message.findById(messageId);

    if (!message) {
        return next(new AppError(404, "Message not found"));
    }

    if (message.senderId.toString() !== req.user.id) {
        return next(new AppError(401, "Unauthorized"));
    }

    await Message.findByIdAndDelete(messageId);

    await Conversation.findOneAndUpdate(
        { participants: { $all: [req.user.id, otherUserId] } },
        { $pull: { messages: messageId } }
    );

    // socket notify both users
    const receiverSocket = socketMap[otherUserId];
    const senderSocket = socketMap[req.user.id];

    if (receiverSocket) {
        io.to(receiverSocket).emit("deleteMessage", messageId);
    }

    if (senderSocket) {
        io.to(senderSocket).emit("deleteMessage", messageId);
    }

    res.status(200).json(
        new ApiResponse(200, null, "Message deleted successfully")
    );
});


// ===================== DELETE CONVERSATION =====================
export const deleteConversation = WrapAsync(async (req, res, next) => {

    const userId = req.user.id;
    const otherUserId = req.params.otherUserId;

    if (!userId || !otherUserId) {
        return next(new AppError(400, "Missing required fields"));
    }

    const conversation = await Conversation.findOne({
        participants: { $all: [userId, otherUserId] }
    });

    if (!conversation) {
        return next(new AppError(404, "Conversation not found"));
    }

    // delete all messages
    await Message.deleteMany({
        _id: { $in: conversation.messages }
    });

    // delete conversation
    await Conversation.findOneAndDelete({
        participants: { $all: [userId, otherUserId] }
    });

    res.status(200).json(
        new ApiResponse(200, null, "Conversation deleted successfully")
    );
});