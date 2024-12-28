import bcrypt from 'bcrypt';
import { ApiError } from '../utils/ApiError.js';

const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password is required');
  }
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  // console.log(password,hashedPassword)
  if(!password || !hashedPassword){
    throw new ApiError(400, "required password and hashedPassword")
  }
  const isMatch = await bcrypt.compare(password, hashedPassword);
  // console.log(isMatch);
  return isMatch;
};

export { hashPassword, comparePassword };
