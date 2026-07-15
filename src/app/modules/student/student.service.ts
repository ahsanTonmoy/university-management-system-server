// import QueryBuilder from "../../builders/queryBuilders";
import AppError from "../../errors/appErrors";
import { UserModel } from "../users/user.model";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";
import  httpStatus  from 'http-status';

// get all students
const getStudents = async (query: Record<string, unknown>): Promise<IStudent[]> => {
    // query copy
    const queryObj = {...query};

    const searchField = ["name.firstName","name.lastName","email","id"]
    // search fild
    let searchTerm = '';
    console.log("base query",query)
    

    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string
    }

    // searchQuery
    const searchQuery= Student.find({
        $or: searchField.map((field)=>({
            [field]: {$regex: searchTerm, $options: "i"}
        }))
    })

    // filtering
    // excloud methods
    const excloudsFields= ['searchTerm','sort','limit','page','skip','fields']
    excloudsFields.forEach((el) => delete queryObj[el])
    
    console.log("query",queryObj)
    const filterQuery = searchQuery.find(queryObj)
     .populate('user')
    .populate('admissionSemester');


    // sorting
    let sort = '-createdAt'; //-deaccending

    if (query?.sort) {
        sort = query.sort as string 
    }

    const sortQuery = filterQuery.sort(sort);

    //limiting
    let limit = 1
    if (query?.limit) {
        limit = Number(query?.limit)
    }

    const limitQuery = sortQuery.limit(limit)
    // pageinetion

    let page= 1;
    let skip = 1;
    if (query?.page) {
        page = Number(query?.page)
        skip = (page - 1)* limit
    }

    const pagenetion = limitQuery.skip(skip)

    //
    let fields ='-__v'
    if (query?.fields) {
        fields = (query?.fields as string).split(',').join(' ');
    }

    const fieldsQuery= limitQuery.select(fields)

    const result = await fieldsQuery;

    // console.log(students);
    if(result.length == 0){
        throw new AppError(httpStatus.NOT_FOUND, "student data don't found");
    }
    return result;
}
// find single student using student id
const getStudentById = async (id: string): Promise<IStudent | null> => {
    const student = await Student.findOne({id})
    .populate('user')
    .populate('admissionSemester');
    //
    if(!student){
        throw new AppError(httpStatus.NOT_FOUND, "Students not found");
    }
    return student;
}
// update student info

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    const student = await Student.findOneAndUpdate(
        {id},
        { $set: modifiedUpdatedData },
        { new: true, runValidators: true }
    );

    return student;
};


// delete student & user
const deleteStudent = async (id: string) => {
    const  sesson = await Student.startSession();
    try {
        sesson.startTransaction();
        const deleteStudent = await Student.findOneAndDelete({ id }, { session: sesson });
        
        if(!deleteStudent){
            throw new AppError(httpStatus.BAD_REQUEST,"failed to delete student");
        }

        const deleteUser = await UserModel.findOneAndDelete({ id },{session: sesson });
        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
        }
        await sesson.commitTransaction();
        await sesson.endSession();
        return deleteStudent;
    }
    catch (error) {
        sesson.abortTransaction();
        throw error;
    }


}

// create student service
export const studentService = {
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
    
};