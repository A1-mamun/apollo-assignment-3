import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';

const registerUser = async (userData: TUser) => {
  // Save user data to the database
  const result = await User.create(userData);

  return result;
};

export const AuthServices = {
  registerUser,
};
