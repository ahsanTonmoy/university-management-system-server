import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import QueryBuilder from '../../builders/queryBuilders';

const adminSearchableFields = [
  'id',
  'email',
  'name.firstName',
  'name.lastName',
  'designation',
];

const getAllAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(
    Admin.find()
      .populate('user')
      .where({ isDeleted: false }),
    query,
  )
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;

  return result;
};

// Get Single Admin
const getSingleAdmin = async (id: string) => {
  const result = await Admin.findOne({ id }).populate('user');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  return result;
};

// Update Admin
const updateAdmin = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  // Handle nested name update
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findOneAndUpdate(
    { id },
    {$set: modifiedUpdatedData},
    {
      new: true,
      runValidators: true,
    },
  ).populate('user');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  return result;
};

// Delete Admin (Soft Delete)
const deleteAdmin = async (id: string) => {
  const result = await Admin.findOneAndUpdate(
    { id },
    { isDeleted: true },
    {
      new: true,
    },
  );
  console.log(result)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  return result;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

