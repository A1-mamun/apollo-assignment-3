import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import AppError from '../errors/AppError';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // checking if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // checking if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    // checking if the user is exist
    const user = await User.isUserExist(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is blocked

    const userStatus = user?.isBlocked;

    if (userStatus) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
    }

    // decoded value
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
