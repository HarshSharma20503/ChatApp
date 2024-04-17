import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

const sendMessage = asyncHandler(async (req, res) => {
  console.log("******** sendMessage Function *********");
  const { chatId, content } = req.body;
  if (!chatId || !content) throw new ApiError(400, "chatId and message is required");

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) throw new ApiError(404, "Chat not found");

    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    console.log("newMessage", newMessage);

    try {
      var message = await Message.create(newMessage);
      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });

      console.log("message", message);

      await Chat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });

      res.status(200).json(new ApiResponse(200, message, "Message sent"));
    } catch (err) {
      console.log("error", err);
      throw new ApiError(500, "Message not sent");
    }
  } catch (err) {
    console.log("error", err);
    throw new ApiError(500, "Message not sent");
  }
});

const allMessages = asyncHandler(async (req, res) => {
  console.log("******** allMessages Function *********");
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    return res.status(200).json(new ApiResponse(200, messages, "Messages retrieved"));
  } catch (err) {
    console.log("error", err);
    throw new ApiError(500, "Messages not found");
  }
});

export { sendMessage, allMessages };
