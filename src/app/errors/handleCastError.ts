import { TError, TGenericErrorResponse } from '../interface/error';
import mongoose from 'mongoose';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const error: TError = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Email',
    error,
  };
};

export default handleCastError;
