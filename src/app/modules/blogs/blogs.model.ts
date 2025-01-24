/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogModel, TBlog } from './blogs.interface';
import { model, Schema } from 'mongoose';

const blogSchema = new Schema<TBlog, BlogModel>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.post('save', function (doc, next) {
  const modifiedDoc = doc as any;
  modifiedDoc._doc = {
    _id: doc._id,
    title: doc.title,
    content: doc.content,
    author: doc.author,
  };
  next();
});

blogSchema.post('findOneAndUpdate', function (doc, next) {
  const modifiedDoc = doc as any;
  modifiedDoc._doc = {
    _id: doc._id,
    title: doc.title,
    content: doc.content,
    author: doc.author,
  };
  next();
});

blogSchema.statics.isBlogExist = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<TBlog, BlogModel>('Blog', blogSchema);
