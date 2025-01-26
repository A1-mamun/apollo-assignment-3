import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const blockUser = async (id: string) => {
  //  check if the user is exist
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  //   check if the user is already blocked
  if (user?.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }

  // block the user
  await User.findByIdAndUpdate(id, { isBlocked: true });

  return null;
};

export const AdminServices = {
  blockUser,
};
