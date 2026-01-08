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

    // Determine if we're in production (HTTPS)
    const isProduction = process.env.NODE_ENV === 'production' || process.env.FRONTEND_URL?.includes('https://');
    
    res.cookie("Inventorymanagmentsystem", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: isProduction ? 'None' : 'Lax', // 'None' requires secure: true
      secure: isProduction, // Only use secure cookies in production (HTTPS)
      domain: isProduction ? undefined : undefined, // Let browser handle domain
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Failed to generate token");
  }
};

module.exports = generateToken;
