import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(100),
    content: z.string().min(3),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
};
