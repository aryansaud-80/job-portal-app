import { cloudinaryUpload } from '../config/cloudinary.js';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getUserData = asyncHandler(async (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    throw new ApiError(400, 'You need to provide userId!');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(400, 'Cannot get user with the id');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Successfully get user data', user));
});

export const applyJob = asyncHandler(async (req, res) => {
  const userId = req.auth?.userId;

  // console.log(userId);

  if (!userId) {
    throw new ApiError(400, 'You need to provide userId!');
  }

  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(400, 'You need to provide jobId!');
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new ApiError(400, 'Cannot get job with the id');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  // console.log(user);

  if (!user) {
    throw new ApiError(400, 'Cannot get user with the id');
  }

  const application = await prisma.application.create({
    data: {
      userId: user.id,
      jobId: job.id,
      appliedDate: new Date().toISOString(),
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, 'Successfully applied job', application));
});

export const getUserApplications = asyncHandler(async (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    throw new ApiError(400, 'You need to provide userId!');
  }

  const applications = await prisma.application.findMany({
    where: {
      userId: userId,
    },

    include: {
      job: {
        select: {
          title: true,
          location: true,
        },
        include: {
          company: {
            select: {
              name: true,
              companyImage: true,
            },
          },
        },
      },
    },
  });

  if (!applications) {
    throw new ApiError(400, 'Cannot get applications!');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Successfully get all applications', applications)
    );
});

export const updateResume = asyncHandler(async (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    throw new ApiError(400, 'You need to provide userId!');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(400, 'Cannot get user with the id');
  }

  const resumeLocalPath = req.file?.path;

  if (!resumeLocalPath) {
    throw new ApiError(400, 'You need to provide resume file!');
  }

  let resumeFile = null;
  try {
    resumeFile = await cloudinaryUpload(resumeLocalPath);
  } catch (error) {
    throw new ApiError(400, 'Cannot upload resume file!');
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        resume: resumeFile.secure_url,
      },
    });

    if (!updatedUser) {
      throw new ApiError(500, 'Cannot update user resume!');
    }

    return res
      .status(200)
      .json(new ApiResponse(200, 'Successfully update resume', updatedUser));
  } catch (error) {
    if (resumeFile) {
      await cloudinaryDelete(resumeFile.public_id);
    }
    throw new ApiError(500, 'Cannot update user resume!');
  }
});
