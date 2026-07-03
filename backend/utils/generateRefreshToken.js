import jwt from "jsonwebtoken";

const generateRefreshToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn:
        process.env.JWT_REFRESH_EXPIRE,
    }
  );
};

export default generateRefreshToken;