import jwt from "jsonwebtoken";

export const isValidToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECERT);
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        console.log("Token has expired");
        return;
      } else {
        return decoded;
      }
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }
};
