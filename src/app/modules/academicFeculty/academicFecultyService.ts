import { TacademicFeculty } from "./academicFecultyInterface"
import { academicFeculty } from "./academicFecultyModel"

const createAcedemicFecultyFromDB= async(payload: TacademicFeculty)=>{
    const result = await academicFeculty.create(payload);
    return result;

}

export const acdemicFecultyService ={
    createAcedemicFecultyFromDB
}