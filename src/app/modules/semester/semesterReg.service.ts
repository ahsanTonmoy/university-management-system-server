import AppError from "../../errors/appErrors";
import { TSemesterRegistration } from "./semesterReg.interface";
import { SemesterRegistration } from "./semesterReg.model";
import  httpStatus  from 'http-status';
import { academicSemester } from './../academicSemester/academicSemesterModel';
import { regesterStatus } from "./semesterReg.comstent";
import { id } from "zod/v4/locales";

// create semester registration
const createSemesterRegService = async (
  payload: TSemesterRegistration,
) => {
    const semesterRegistrationId = payload.academicSemester;

    /* =========================
        Step 01:
        Check upcoming/ongoing registration
        ========================= */

    const isThereAnyUpcomingOrOngoingSemester =
        await SemesterRegistration.findOne({
        $or: [
            { status: regesterStatus.UPCOMING },
            { status: regesterStatus.ONGOING },
        ],
        });

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError(
        httpStatus.BAD_REQUEST,
        `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
        );
    }

    /* =========================
        Step 02:
        Check academic semester exists
        ========================= */

    const isAcademicSemesterExists = await academicSemester.findById(
        semesterRegistrationId,
    );

    if (!isAcademicSemesterExists) {
        throw new AppError(
        httpStatus.NOT_FOUND,
        'This academic semester not found!',
        );
    }

    /* =========================
        Step 03:
        Check same semester is already registered
        ========================= */

    const isSemesterRegistrationExists =
        await SemesterRegistration.findOne({
        academicSemester: semesterRegistrationId,
        });

    if (isSemesterRegistrationExists) {
        throw new AppError(
        httpStatus.BAD_REQUEST,
        'This academic semester is already registered!',
        );
    }

    /* =========================
        Step 04:
        Create registration
        ========================= */

    const result = await SemesterRegistration.create(payload);

    return result;
};

// get all semester registrations
const getAllSemesterFromDB = async () => {
  const result = await SemesterRegistration.find({
    isDeleted: { $ne: true },
  }).populate('academicSemester');

  return result;
};
// get single semester
const getSingleSemesterFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id)
    .populate('academicSemester');

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found!',
    );
  }

  return result;
};

// update semester
const updateSemesterFromDB = async(id: string, payload: Partial<TSemesterRegistration>) =>{
     /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

    /* Step1: Check if the semester is exist*/
    const isSemesterRegistrationExists =
        await SemesterRegistration.findById(id)

    if (!isSemesterRegistrationExists) {
        throw new AppError(
        httpStatus.NOT_FOUND,
        'This semester is not found!',
        );
    }

    /*Step3: If the requested semester registration is ended, we will not update anything */
    const currentSemesterStatus = isSemesterRegistrationExists?.status;
    const requestedSemesterStatus = payload?.status;

    if (currentSemesterStatus === regesterStatus.ENDED) {
        throw new AppError(
        httpStatus.BAD_REQUEST,
        `This semester is already ${currentSemesterStatus}`,
        );
    }

    // UPCOMING --> ONGOING --> ENDED
    if (currentSemesterStatus === regesterStatus.UPCOMING
        && 
        requestedSemesterStatus === regesterStatus.ENDED || 
        currentSemesterStatus === requestedSemesterStatus) {
        throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
        );
    }

    if (currentSemesterStatus === regesterStatus.ONGOING
        && 
        requestedSemesterStatus === regesterStatus.UPCOMING || 
        currentSemesterStatus === requestedSemesterStatus) {
        throw new AppError(
        httpStatus.BAD_REQUEST,
        `You can not directly change status from ${currentSemesterStatus} to ${requestedSemesterStatus}`,
        );
    }

    /*----------------*/
    console.log("currentSemesterStatus",currentSemesterStatus)
    console.log("requestedSemesterStatus",requestedSemesterStatus)
    const result = await SemesterRegistration.findByIdAndUpdate(
        id, payload ,{
            new: true,
            runValidators: true
        }
    ).populate('academicSemester');

    return result;



}

// delete semster
const deleteSemesterFromDB = async (id: string) => {
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found!',
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

export const semesterRegService ={
    createSemesterRegService,
    getAllSemesterFromDB,
    getSingleSemesterFromDB,
    updateSemesterFromDB,
    deleteSemesterFromDB
}