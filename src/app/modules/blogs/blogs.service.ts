import { JwtPayload } from 'jsonwebtoken';
import { TBlog } from './blogs.interface';
import { User } from '../user/user.model';
import { Blog } from './blogs.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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

const updateBlogIntoDB = async (
  id: string,
  blogData: TBlog,
  userData: JwtPayload,
) => {
  //   check if the blog is exist
  const blog = await Blog.isBlogExist(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  //   find the user id
  const user = await User.findOne({ email: userData.email }).select('_id');

  // check if the user is the author of the blog
  if (blog.author.toString() !== user?._id.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
  }

  // update the blog
  const result = await Blog.findByIdAndUpdate(id, blogData, {
    new: true,
    runValidators: true,
  }).populate({
    path: 'author', // Field to populate
    select: '_id name email', // Properties to include
  });

  return result;
};

const deleteBlogFromDB = async (id: string, userData: JwtPayload) => {
  //   check if the blog is exist
  const blog = await Blog.isBlogExist(id);

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  //   find the user id
  const user = await User.findOne({ email: userData.email }).select('_id');

  // check if the user is the author of the blog
  if (blog.author.toString() !== user?._id.toString()) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized');
  }

  // delete the blog
  const result = await Blog.findByIdAndDelete(id);

  return result;
};
export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
