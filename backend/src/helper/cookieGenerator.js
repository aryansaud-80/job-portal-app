import jwt from 'jsonwebtoken';

export const generateCookie = async (userId) => {
  const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    httpOnly: true,
    expires: Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  };

  return { token, cookieOptions };
};
