import { prisma } from '../config/prisma.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { cloudinaryDelete, cloudinaryUpload } from '../config/cloudinary.js';
import { generateCookie } from '../helper/cookieGenerator.js';
import { hashPassword, comparePassword } from '../helper/bcrypt.helper.js';
import chalk from 'chalk';

export const createCompany = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => !field)) {
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

  // console.log(chalk.bgYellow(typeof companyImage.public_id));

  // console.log(chalk.red(companyImage));

  try {
    const newCompany = await prisma.company.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
        companyImage_public_id: companyImage?.public_id,
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

export const loginCompany = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(password);

  if ([email, password].some((field) => !field)) {
    throw new ApiError(
      400,
      `Please provide field ${!password && 'password & '} ${!email && 'email'}`
    );
  }

  const company = await prisma.company.findFirst({
    where: {
      email: email,
    },
  });

  if (!company) {
    throw new ApiError(404, 'Company not found');
  }

  // console.log(chalk.bgGreen(company.email + ' ' + '!!'));
  // console.log(chalk.bgRed(company.password + ' ' + '!!'));

  const isPasswordMatch = await comparePassword(password, company.password);

  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = await generateCookie(company.id);

  return res
    .status(200)
    .cookie('token', token.token, token.cookieOptions)
    .json(new ApiResponse(200, 'Login successful', company));
});

export const deleteCompany = asyncHandler(async (req, res) => {
  const companyId = req.company?.id;

  if (!companyId) {
    throw new ApiError(401, 'You are not authorized to delete company!');
  }

  await prisma.company.delete({
    where: {
      id: companyId,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(201, 'Company deleted successfully', {}));
});

export const getCompanyData = asyncHandler(async (req, res) => {
  console.log('Request Object:', req);
  const companyId = req.company?.id;

  if (!companyId) {
    console.log(req);
    throw new ApiError(402, 'You are not authorized! Please login first!');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      id: true,
      name: true,
      companyImage: true,
      email: true,
    },
  });

  if (!company) {
    throw new ApiError(401, 'Company not found!');
  }

  return res
    .status(200)
    .json(new ApiResponse(201, 'Company data fetched successfully', company));
});

export const updateCompany = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if ([name, email].every((field) => !field)) {
    throw new ApiError(400, 'Need at least one field to update!');
  }

  const companyId = req.company?.id;

  if (!companyId) {
    throw new ApiError(400, 'You are not authorized to update company data');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new ApiError(405, 'No company is found!');
  }

  const updatedCompany = await prisma.company.update({
    where: {
      id: company.id,
    },
    data: {
      name: name || company.name,
      email: email || company.email,
    },
  });

  if (!updatedCompany) {
    throw new ApiError(401, 'Error while updating company detail!');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Company details updated successfully', {}));
});

export const updateCompanyImage = asyncHandler(async (req, res) => {
  const companyImageLocalPath = req.file?.path;

  if (!companyImageLocalPath) {
    throw new ApiError(401, 'Need image to update');
  }

  if (!req.company?.id) {
    throw new ApiError(401, 'You are not authorized to update company image!');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: req.company?.id,
    },
  });

  if (!company) {
    throw new ApiError(400, 'No company found with this id');
  }

  let companyImage = null;
  try {
    companyImage = await cloudinaryUpload(companyImageLocalPath);
  } catch (error) {
    throw new ApiError(400, 'Error uploading image in cloudinary');
  }

  if (companyImage?.url) {
    await cloudinaryDelete(company.companyImage_public_id);
  }

  const updatedCompany = await prisma.company.update({
    where: {
      id: company?.id,
    },
    data: {
      companyImage_public_id:
        companyImage?.public_id || company.companyImage_public_id,
      companyImage: companyImage?.url || company.companyImage,
    },
  });

  if (!updateCompany) {
    throw new ApiError(400, 'Error while updating companyImage');
  }

  return res.status(200).json(new ApiResponse(201, 'Company image successfully updated', {  }));
});

export const updatedPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError(400, 'Required new password to update');
  }

  if (!req.company?.id) {
    throw new ApiError(400, 'You are not authorized to update password!');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: req.company?.id,
    },
  });

  if (!company) {
    throw new ApiError(400, 'cannot find company');
  }

  const isSame = await comparePassword(newPassword, company.password);

  if (isSame) {
    throw new ApiError(401, "Its same as old password!")
  }

  const hashedNewPassword = await hashPassword(newPassword);

  if (!hashedNewPassword) {
    throw new ApiError(500, 'Error while hashing password!');
  }

  const updatedCompanyPass = await prisma.company.update({
    where: {
      id: company.id,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  if (!updatedCompanyPass) {
    throw new ApiError(500, 'Error while updating password');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Successfully updated password', {}));
});
