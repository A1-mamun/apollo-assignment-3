import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
import httpStatus from 'http-status';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminServices.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminServices.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});
export const AdminControllers = {
  blockUser,
  deleteBlog,
};
