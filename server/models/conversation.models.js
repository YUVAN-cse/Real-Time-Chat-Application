import mongoose from "mongoose";
import Message from "./message.models.js";

const ConversationSchema = new mongoose.Schema({
   participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }],
   messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
   }],
});


ConversationSchema.pre("findOneAndDelete" , async function(conversation){
   await Message.deleteMany({conversation: conversation._id});
})

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;