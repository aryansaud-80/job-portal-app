import { Webhook } from 'svix';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { prisma } from '../config/prisma.js';

export const webhookController = asyncHandler(async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_SECRET_KEY);

    await wh.verify(req.body, {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    const { data, eventType } = req.body;

    switch (eventType) {
      case 'user.created': {
        const registeredUser = await prisma.user.create({
          data: {
            id: data.id,
            email: data.email_addresses[0].email_address,
            name: (data.first_name || '') + ' ' + (data.last_name || ''),
            resume: '',
            image: data.profile_image_url,
            createdAt: new Date(data.created_at),
            updatedAt: new Date(data.updated_at),
          },
        });
        res.status(201).json(new ApiResponse(201, 'User created', ''));
        break;
      }
      case 'user.updated': {
        const updatedUser = await prisma.user.update({
          where: {
            id: data.id,
          },
          data: {
            name: (data.first_name || '') + ' ' + (data.last_name || ''),
            image: data.profile_image_url,
            email: data.email_addresses[0].email_address,
            updatedAt: new Date(data.updated_at),
          },
        });

        res.status(200).json(new ApiResponse(200, 'User updated', ''));
        break;
      }
      case 'user.deleted': {
        const deletedUser = await prisma.user.delete({
          where: {
            id: data.id,
          },
        });

        res.status(200).json(new ApiResponse(200, 'User deleted', ''));
        break;
      }

      case 'default':
        break;
    }
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});
