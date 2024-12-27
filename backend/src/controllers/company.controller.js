import { prisma } from '../config/prisma.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { cloudinaryDelete, cloudinaryUpload } from '../config/cloudinary.js';
import { generateCookie } from '../helper/cookieGenerator.js';
import { hashPassword } from '../helper/bcrypt.helper.js';
// import chalk from 'chalk';

export const createCompany = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field === '')) {
    throw new ApiError(400, 'Please provide all fields');
  }

  const companyExists = await prisma.company.findFirst({
    where: {
      OR: [{ email: email }, { name: name }],
    },
  });

  if (companyExists) {
    throw new ApiError(400, 'Company with this email or name already exists');
  }

  const companyLocalImage = req.file?.path;

  // console.log(chalk.blue(companyLocalImage));

  let companyImage;
  if (companyLocalImage) {
    try {
      companyImage = await cloudinaryUpload(companyLocalImage);
    } catch (error) {
      throw new ApiError(500, 'Error uploading image');
    }
  }

  // console.log(chalk.red(companyImage));

  try {
    const newCompany = await prisma.company.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        companyImage: companyImage?.url,
      },
    });

    if (!newCompany) {
      res.status(500).json(new ApiResponse(500, 'Error creating company'));
    }

    const token = await generateCookie(newCompany.id);

    return res
      .status(201)
      .cookie('token', token.token, token.cookieOptions)
      .json(new ApiResponse(201, 'Company created successfully', newCompany));
  } catch (error) {
    await cloudinaryDelete(companyImage?.public_id);
    // console.error(chalk.yellow(error));
    throw new ApiError(500, error.message);
  }
});
