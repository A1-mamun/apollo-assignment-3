import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { AuthValidations } from './auth.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidations.registerUserValidationSchema),
  AuthControllers.registerUser,
);

router.post('/login', AuthControllers.loginUser);

router.post(
  '/refresh-token',
  validateRequest(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
