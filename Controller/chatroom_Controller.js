const ChatRoom = require('../Schemas/ChatRoom'); // Adjust the path to your ChatRoom model if necessary

// Get ChatRoom
const getChatRoom = async (req, res) => {
  try {
    const chatRoom = await ChatRoom.find({});
    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ChatRooms', error });
  }
};

// Get a ChatRoom

const getAChatRoom = async (req, res) => {
  try {
    const {id} = req.params
    const ChatRoom = await ChatRoom.findById(id);
    res.status(200).json(ChatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ChatRooms', error });
  }
};

// Create ChatRoom
const createChatRoom = async (req, res) => {
  try {
    const chatRoom = new ChatRoom(req.body);
    await chatRoom.save();
    res.status(201).json(chatRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error creating ChatRoom', error });
  }
};

// Update ChatRoom
const updateChatRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const chatRoom = await ChatRoom.findByIdAndUpdate(id, req.body, { new: true });
    if (!chatRoom) {
      return res.status(404).json({ message: 'ChatRoom not found' });
    }
    res.status(200).json(ChatRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error updating ChatRoom', error });
  }
};

// Delete ChatRoom
const deleteChatRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const chatRoom = await ChatRoom.findByIdAndDelete(id);
    if (!chatRoom) {
      return res.status(404).json({ message: 'ChatRoom not found' });
    }
    res.status(200).json({ message: 'ChatRoom deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting ChatRoom', error });
  }
};

module.exports = {
  getChatRoom,
  getAChatRoom,
  createChatRoom,
  updateChatRoom,
  deleteChatRoom
};
