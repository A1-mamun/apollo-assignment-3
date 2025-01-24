import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(100),
    content: z.string().min(3),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(100).optional(),
    content: z.string().min(3).optional(),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
