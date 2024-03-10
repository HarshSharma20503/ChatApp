import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Chat } from "../models/chat.model.js";
import mongoose from "mongoose";

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new ApiError(400, "userId is required");

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { $elemMatch: { $eq: req.user._id } } }, { users: { $elemMatch: { $eq: userId } } }],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat = await User.populate(isChat, { path: "latestMessage.sender", select: "name pic email" });
  if (isChat.length > 0) {
    return res.status(200).json(new ApiResponse(200, isChat[0], "Chat Sent"));
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  try {
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findById(createdChat._id).populate("users", "-password");
    return res.status(200).json(new ApiResponse(200, FullChat, "Chat created"));
  } catch (err) {
    console.log("error", err);
    throw new ApiError(500, "Chat not created");
  }
});

const getChats = asyncHandler(async (req, res) => {
  try {
    const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    const results = await User.populate(chats, { path: "latestMessage.sender", select: "name pic email" });
    res.status(200).json(new ApiResponse(200, results, "Chats Sent"));
  } catch (err) {
    console.log("error", err);
    throw new ApiError(500, "Chats not found");
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) throw new ApiError(400, "Please Fill all the fields");

  var users = JSON.parse(req.body.users);

  console.log("users", users);

  if (!users || users.length < 2) throw new ApiError(400, "Users are required and should be more than 2");
  users.map((user) => {
    return new mongoose.Types.ObjectId(user);
  });
  users.push(req.user._id);

  console.log("users", users);

  try {
    console.log("Creating Group Chat");
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user._id,
    });
    console.log("Chat", groupChat);
    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    return res.status(200).json(new ApiResponse(200, fullGroupChat, "Group Chat Created"));
  } catch (err) {
    console.log("error", err);
    throw new ApiError(500, "Chat not created");
  }
});

export { accessChat, getChats, createGroupChat };
