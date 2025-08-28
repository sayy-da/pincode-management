import User from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



export const register = async (req, res) => {
  try {
    const { name, email, password, pincode, address } = req.body;

    if (!name || !email || !password || !pincode || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    let addressObj = address;
    if (typeof address === "string") {
      const parts = address.split(",").map(s => s.trim());
      addressObj = {
        Name: parts[0] || "",
        District: parts[1] || "",
        State: parts[2] || "",
        BranchType: ""  
      };
    }


    const user = new User({
      name,
      email,
      password: hashedPassword,
      address: addressObj
    });

    await user.save();

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  console.log('safa',email,password)

      const user = await User.findOne({ email });
      console.log(user);

      
        if (!user) {
          return res.status(401).send({ message: "Invalid credentials" });
        }
   const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30m"
      });
   
      res.status(200).send({
        message: "Login successful",
        token,
        user
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Server error" });
    }
  };


  export const home = (req, res) => {
    res.send("Welcome to the user home page!");
  };
  


export const pincode = async (req, res) => {
  console.log('test 1')
  const { pincode } = req.params;

  console.log(pincode)

  if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ message: 'Invalid pincode. Must be 6 digits.' });
  }

  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    const record = data && data[0];

    if (!record || record.Status === 'Error' || !record.PostOffice) {
      return res.status(404).json({ message: 'No addresses found for this pincode' });
    }

    const addresses = record.PostOffice.map(po => ({
      Name: po.Name,
      District: po.District,
      State: po.State,
      BranchType: po.BranchType,
    }));

    return res.json({ addresses });
  } catch (err) {
    console.error('Postal API error:', err.message || err);
    return res.status(500).json({ message: 'Error fetching pincode data' });
  }
};
