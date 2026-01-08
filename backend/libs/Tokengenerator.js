const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (user, res) => {
  try {
    // Check that the secret exists
    if (!process.env.JWT_SECRET) {
      throw new Error("Secret key is not defined in the environment variables.");
    }

    // Use the correct environment variable here
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,   // <-- Fixed here
      { expiresIn: '7d' }
    );

    console.log("Generated JWT:", token); 

    res.cookie("Inventorymanagmentsystem", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Failed to generate token");
  }
};

module.exports = generateToken;
