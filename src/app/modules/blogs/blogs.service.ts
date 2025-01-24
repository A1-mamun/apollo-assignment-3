import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blogs.interface';
import { User } from '../user/user.model';
import { Blog } from './blogs.model';

const createBlogIntoDB = async (blogData: TBlog, userData: JwtPayload) => {
  // create a blog object
  const blog: Partial<TBlog> = { ...blogData };

  //   find the user id
  const { email } = userData;
  const user = await User.findOne({ email });

  blog.author = user?._id;

  // create the blog
  const result = await Blog.create(blog);

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
};
