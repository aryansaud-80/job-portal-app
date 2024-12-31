import { asyncHandler } from '../utils/asyncHandler.js';
import { prisma } from '../config/prisma.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import chalk from 'chalk';

export const postJob = asyncHandler(async (req, res) => {
  const { title, description, category, location, level, salary } = req.body;

  // console.log({ title, description, category, location, level, salary });

  if (
    [title, description, category, location, level, salary].some(
      (fields) => !fields
    )
  ) {
    throw new ApiError(400, 'Required all field to post a job!');
  }

  const companyId = req.company?.id;

  if (!companyId) {
    throw new ApiError(401, 'You are not authorized to post a job');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new ApiError(403, 'Cannot find a company');
  }

  const newJob = await prisma.job.create({
    data: {
      title,
      description,
      category,
      location,
      salary,
      level,
      date: new Date().toISOString(),
      visible: true,
      companyId: company.id,
    },
  });

  if (!newJob) {
    throw new ApiError(500, 'Error while posting a new job!');
  }

  return res
    .status(200)
    .json(new ApiResponse(201, 'successfully added a new job vacancy!', {}));
});

export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await prisma.job.findMany({
    where: {
      visible: true,
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          email: true,
          companyImage: true,
        },
      },
    },
  });

  if (!jobs) {
    throw new ApiError(400, 'Cannot get jobs!');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Successfully get all jobs', jobs));
});

export const getJobById = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(400, 'You need to provide jobId!');
  }

  const job = await prisma.job.findFirst({
    where: {
      AND: [
        {
          id: jobId,
        },
        {
          visible: true,
        },
      ],
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          email: true,
          companyImage: true,
        },
      },
    },
  });

  // console.log(chalk.blue(JSON.stringify(job)));

  if (!job) {
    throw new ApiError(400, 'Cannot get job with the id');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'Successfully get job', job));
});

export const changeJobVisibility = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(401, 'Required job id');
  }

  const companyId = req.company?.id;

  if (!companyId) {
    throw new ApiError(
      401,
      'You are not authorized to change visibility of job!'
    );
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new ApiError(400, 'No company with the id');
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new ApiError(400, 'Cannot find the job with the id!');
  }

  if (job.companyId !== companyId) {
    throw new ApiError(
      403,
      'You can only change visibility for jobs owned by your company'
    );
  }

  const updateVisibility = await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      visible: !job.visible,
    },
  });

  if (!updateVisibility) {
    throw new ApiError(500, 'Error while updating visibility of job');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'Successfully change the visibility of job', {})
    );
});

export const deleteJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  if (!jobId) {
    throw new ApiError(400, 'Required job id!');
  }

  const companyId = req.company?.id;

  if (!companyId) {
    throw new ApiError(400, 'You are not authorized please login first!');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  // console.log(chalk.blue(company.id));

  if (!company) {
    throw new ApiError(400, 'Cannot find the company!');
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new ApiError(400, 'Cannot find the job with the id');
  }

  if (job.companyId !== company.id) {
    throw new ApiError(
      400,
      'You can only delete the job which are posted by your own company!'
    );
  }

  const deletedJob = await prisma.job.delete({
    where: {
      id: job.id,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, 'Successfully deleted the job', {}));
});

export const getCompanyJobApplicants = asyncHandler(async (req, res) => {
  const companyId = req.company?.id;

  if (!companyId) {
    throw new ApiError(401, 'You are not authorized');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new ApiError(400, 'Cannot find the company');
  }

  const jobs = await prisma.company.findMany({
    where: {
      id: companyId,
    },
    include: {
      jobs: {
        include: {
          applications: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  image: true,
                  resume: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (jobs.length < 1) {
    return res.status(400).json(new ApiResponse(400, 'Cannot get the jobs'));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, `Successfully get all applicants`, jobs));
});

export const getCompanyPostedJob = asyncHandler(async (req, res) => {
  const companyId = req.company?.id;

  if (!companyId) {
    throw new ApiError(401, 'You are not authorized');
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new ApiError(400, 'Cannot find the company');
  }

  const jobs = await prisma.job.findMany({
    where: {
      companyId: company.id,
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          email: true,
          companyImage: true,
        },
      },
    },
  });

  if (jobs.length < 1) {
    throw new ApiError(400, 'Cannot get the jobs');
  }

  const jobsWithApplicants = await Promise.all(
    jobs.map(async (job) => {
      const applicantsCount = await prisma.application.count({
        where: {
          jobId: job.id,
        },
      });

      return {
        ...job,
        applicantsCount,
      };
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Successfully get all posted jobs',
        jobsWithApplicants
      )
    );
});
