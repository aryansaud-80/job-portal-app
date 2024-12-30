import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import chalk from 'chalk';

export const jwtVerifyToken = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(' ')[1];

      // console.log(chalk.bgBlack(token));

    if (!token) {
      throw new ApiError(400, 'You are not login! Please login first!!');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const company = await prisma.company.findUnique({
      where: {
        id: decodedToken.id,
      },
    });

    if (!company) {
      throw new ApiError(403, 'No company is found!');
    }

    req.company = company;
    next();
  } catch (error) {
    next(new ApiError(401, error.message));
  }
});
