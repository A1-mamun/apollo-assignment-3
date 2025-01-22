import { model, Schema } from 'mongoose';
import { Role } from './user.constant';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: Role,
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// hash password before saving
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set password to empty string before sending response
userSchema.post('save', function (doc, next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifiedDoc = doc as any;
  modifiedDoc._doc = {
    _id: doc._id,
    name: doc.name,
    email: doc.email,
  };
  next();
});

export const User = model<TUser>('User', userSchema);
