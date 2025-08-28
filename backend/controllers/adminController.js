
import User from "../models/users.js";

  
  export const viewUsers = async (req, res) => {
    const users = await User.find({ role: 'user' });
    res.send(users);
  };
  
