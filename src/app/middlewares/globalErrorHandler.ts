/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { TErrorSources } from '../interface/error';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleCastError from '../errors/handleCastError';
import handleValidationError from '../errors/handleValidationError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import config from '../config';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // default values
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const error = handleZodError(err);

    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = error?.errorSources;
  } else if (err?.name === 'CastError') {
    const error = handleCastError(err);

    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = error?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const error = handleValidationError(err);

    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = error?.errorSources;
  } else if (err?.code === 11000) {
    const error = handleDuplicateError(err);

    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = error?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    statusCode,
    message,
    errorSources,
    stack: config.node_env === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
